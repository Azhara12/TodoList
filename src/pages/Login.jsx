import { useState } from "react";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import axios from "axios"; // API call karne ke liye axios zaroor install kar lein

// ─── FORGOT PASSWORD SCREEN (Secure OTP Flow) ─────────────────────────────
function ForgotPasswordScreen({ goTo }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1: Send OTP, Step 2: Verify & Reset
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1. Send OTP to Real User Email
  async function handleSendOTP(e) {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    try {
      // Backend Route jo aapne banaya hoga uspar hit karega
      const res = await axios.post(
        "http://localhost:5001/api/auth/forgot-password",
        { email },
      );

      setToast({
        type: "success",
        message: "If account exists, OTP has been sent!",
      });
      setStep(2); // Agli screen par le jayen jahan OTP enter karna hai
    } catch (err) {
      setToast({
        type: "error",
        message:
          err.response?.data?.message || "Something went wrong. Try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  // 2. Verify OTP & Update Password
  async function handleResetPassword(e) {
    e.preventDefault();
    setToast(null);

    if (newPassword.length < 6) {
      setToast({ type: "error", message: "Must be at least 6 characters." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setToast({ type: "error", message: "Passwords do not match." });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/reset-password",
        {
          email,
          otp,
          newPassword,
        },
      );

      setToast({ type: "success", message: "Password updated successfully!" });
      setTimeout(() => goTo("login"), 1500); // 1.5 second baad login page par redirect
    } catch (err) {
      setToast({
        type: "error",
        message: err.response?.data?.message || "Invalid or expired OTP.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm bg-[#122333] border border-slate-700/50 p-5 sm:p-6 rounded-2xl shadow-2xl">
      <button
        type="button"
        onClick={() => goTo("login")}
        className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-emerald-400 transition mb-4 justify-center w-full"
      >
        ← Back to Sign In
      </button>

      <div className="mb-3 text-center">
        <h1 className="text-base font-extrabold text-white tracking-tight">
          {step === 1 ? "Reset Password" : "Enter Verification Code"}
        </h1>
        <p className="text-[11px] text-slate-400 mt-1">
          {step === 1
            ? "Enter your registered email to receive an OTP."
            : `We sent a code to ${email}`}
        </p>
      </div>

      {toast && (
        <div
          className={`mb-3 px-3 py-2 rounded-xl border text-[11px] font-medium text-center ${
            toast.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* STEP 1: Enter Email Form */}
      {step === 1 && (
        <form onSubmit={handleSendOTP} className="space-y-2.5">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="w-full bg-[#233545] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl py-2 text-xs shadow-md transition disabled:opacity-50"
          >
            {loading ? "Sending Code..." : "Send OTP"}
          </button>
        </form>
      )}

      {/* STEP 2: Enter OTP and New Password Form */}
      {step === 2 && (
        <form onSubmit={handleResetPassword} className="space-y-2.5">
          <input
            type="text"
            placeholder="6-Digit OTP Code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            maxLength={6}
            disabled={loading}
            className="w-full bg-[#233545] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white tracking-widest text-center font-bold outline-none disabled:opacity-50"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            disabled={loading}
            className="w-full bg-[#233545] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none disabled:opacity-50"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
            className="w-full bg-[#233545] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none disabled:opacity-50"
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-1/3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl py-2 text-xs transition"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-2/3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl py-2 text-xs shadow-md transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Verify & Reset"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// ─── ROOT LOGIN WRAPPER ───────────────────────────────────────────────────────
export default function Login({ setLogged }) {
  const [screen, setScreen] = useState("login");

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#1B3B52] font-sans antialiased text-slate-200 relative overflow-hidden px-4">
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-emerald-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-teal-600/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full flex justify-center items-center">
        {screen === "login" && (
          <LoginScreen setLogged={setLogged} goTo={setScreen} />
        )}
        {screen === "register" && <RegisterScreen goTo={setScreen} />}
        {screen === "forgot" && <ForgotPasswordScreen goTo={setScreen} />}
      </div>
    </div>
  );
}
