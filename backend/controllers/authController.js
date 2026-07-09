const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Resend } = require("resend");
const User = require("../models/User");

// Initialize Resend using the API Key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to generate a JWT token valid for 1 day
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// ==========================================
// 1. REGISTER USER
// ==========================================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate that all required fields are provided
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter all required fields" });
    }

    // Check if a user with this email already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user record in the database
    const user = await User.create({
      name,
      email,
      password,
    });

    // Return the created user details along with the auth token
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ==========================================
// 2. LOGIN USER
// ==========================================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by their email address
    const user = await User.findOne({ email });

    // Verify user exists and check if the password matches the hash
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ==========================================
// 3. UPDATE PROFILE (Cloudinary Support)
// ==========================================
const updateProfile = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    let avatarUrl;

    // Get the uploaded file path from Cloudinary storage middleware
    if (req.file) {
      avatarUrl = req.file.path;
    } else {
      return res
        .status(400)
        .json({ message: "Please select an image to upload" });
    }

    // Update only the avatar field and return the freshly updated document
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: avatarUrl },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ==========================================
// 4. FORGOT PASSWORD (Using Resend API)
// ==========================================
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    // Security practice: Return generic success message even if email is wrong
    if (!user) {
      return res
        .status(200)
        .json({ message: "If account exists, OTP has been sent!" });
    }

    // Generate a secure, random 6-digit number string
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store the temporary verification code and its 10-minute expiry time
    user.resetPasswordToken = otp;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    // Send the dynamic verification email using the Resend SDK
    await resend.emails.send({
      from: "onboarding@resend.dev", // Free default domain for testing
      to: user.email,
      subject: "🔒 Your Password Reset Code",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #0f172a; color: #f8fafc; border-radius: 15px; max-width: 400px; margin: auto;">
          <h2 style="color: #34d399;">Reset Password</h2>
          <p style="color: #94a3b8; font-size: 14px;">Your 6-digit verification code is given below:</p>
          <div style="background-color: #1e293b; padding: 15px; border-radius: 10px; margin: 20px 0; border: 1px solid #334155;">
            <h1 style="color: #10b981; letter-spacing: 6px; font-size: 32px; margin: 0; font-family: monospace;">${otp}</h1>
          </div>
          <p style="color: #64748b; font-size: 11px;">This code is valid for 10 minutes. If you did not request this, ignore this email.</p>
        </div>
      `,
    });

    res.status(200).json({ message: "If account exists, OTP has been sent!" });
  } catch (error) {
    console.error("Resend Forgot Password Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ==========================================
// 5. RESET PASSWORD
// ==========================================
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Check if user email, active token match, and if the token timeframe is valid
    const user = await User.findOne({
      email,
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // Assign new raw password; schema pre-save hook will encrypt it automatically
    user.password = newPassword;

    // Clear the temporary verification fields out of the database record
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateProfile,
  forgotPassword,
  resetPassword,
};