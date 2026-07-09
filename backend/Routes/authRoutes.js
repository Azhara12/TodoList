const express = require('express');
const router = express.Router();
const { upload } = require("../config/cloudinary"); 

// Controllers se naye forgotPassword aur resetPassword functions ko import kiya
const { 
  registerUser, 
  loginUser, 
  updateProfile, 
  forgotPassword, 
  resetPassword 
} = require('../controllers/authController');

// @desc    Register a new user
router.post('/register', registerUser);

// @desc    Auth user & get token
router.post('/login', loginUser);

// @desc    Update user profile avatar
router.put('/update-profile', upload.single("image"), updateProfile);

// ─── NEW SECURE OTP ROUTES ──────────────────────────────────────────
// @desc    Send OTP to email for password reset
// @route   POST /api/auth/forgot-password
router.post('/forgot-password', forgotPassword);

// @desc    Verify OTP & Reset password
// @route   POST /api/auth/reset-password
router.post('/reset-password', resetPassword);

module.exports = router;