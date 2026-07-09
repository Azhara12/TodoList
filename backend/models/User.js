const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Cloudinary ka image URL string me store karne ke liye
    avatar: { type: String, default: null },
    
    // ─── NEW FIELDS FOR SECURE OTP ──────────────────────────────────────
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
  },
  { timestamps: true },
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  // Agar password me koi tabdeeli nahi hui, to seedha agay barh jao
  if (!this.isModified("password")) {
    //return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  //  next();
  } catch (error) {
    console.log("Error in pre-save hook:", error);
    next(error);
  }
});

// Method to compare entered password with hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);