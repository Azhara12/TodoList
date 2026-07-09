import { useState } from "react";
import { registerUser } from "../services/api";

function Toast({ message, type }) {
  if (!message) return null;
  const colors =
    type === "success"
      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
      : "bg-red-500/10 border-red-500/30 text-red-400";
  return (
    <div
      className={`mb-3 px-3 py-2 rounded-xl border text-[11px] font-medium text-center ${colors}`}
    >
      {message}
    </div>
  );
}

export default function RegisterScreen({ goTo }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [toast, setToast] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  async function handleRegister(e) {
    e.preventDefault();
    if (password.length < 6) {
      setToast({
        type: "error",
        message: "Password must be at least 6 characters.",
      });
      return;
    }
    if (password !== confirm) {
      setToast({ type: "error", message: "Passwords do not match." });
      return;
    }
    if (!agreed) {
      setToast({ type: "error", message: "Please agree to the Terms." });
      return;
    }

    try {
      const payload = { name, email, password, avatar: profileImage || null };
      await registerUser(payload);
      setToast({ type: "success", message: `Account created successfully!` });
      setTimeout(() => goTo("login"), 1500);
    } catch (error) {
      setToast({
        type: "error",
        message: error.response?.data?.message || "Error creating account.",
      });
    }
  }

  const strength =
    password.length === 0
      ? 0
      : password.length < 6
        ? 1
        : password.length < 10
          ? 2
          : 3;
  const strengthLabel = ["", "Too Short", "Fair", "Strong"];
  const strengthColor = ["", "bg-rose-500", "bg-amber-500", "bg-emerald-500"];

  return (
    <div className="w-full max-w-md bg-[#122333] border border-slate-700/50 p-5 rounded-2xl shadow-2xl">
      <div className="flex justify-between items-center mb-2">
        <button
          type="button"
          onClick={() => goTo("login")}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-emerald-400 transition"
        >
          ← Back
        </button>
        <span className="text-[10px] text-slate-500">Step 1 of 1</span>
      </div>

      <div className="mb-2 text-center">
        <h1 className="text-xl font-black text-white tracking-tight">
          Create Account
        </h1>
      </div>

      <Toast {...(toast || {})} message={toast?.message} />

      <form onSubmit={handleRegister} className="space-y-2.5">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-[#233545] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#233545] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showRegPassword ? "text" : "password"}
                placeholder="Min 6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#233545] border border-slate-700 rounded-xl pl-3 pr-8 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:border-emerald-500"
              />
            </div>
            {password.length > 0 && (
              <div className="mt-1 flex items-center gap-1 px-0.5">
                <div className="flex-1 flex gap-0.5">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-0.5 flex-1 rounded-full ${i <= strength ? strengthColor[strength] : "bg-slate-700"}`}
                    />
                  ))}
                </div>
                <span
                  className={`text-[8px] font-bold uppercase ${strength === 1 ? "text-rose-400" : strength === 2 ? "text-amber-400" : "text-emerald-400"}`}
                >
                  {strengthLabel[strength]}
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Confirm
            </label>
            <input
              type="password"
              placeholder="Repeat"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="w-full bg-[#233545] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="flex items-start gap-2 bg-[#233545]/30 border border-slate-700/50 p-2 rounded-xl">
          <input
            id="terms"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 w-3.5 h-3.5 rounded border-slate-700 bg-[#233545] text-emerald-600 focus:ring-0 cursor-pointer"
          />
          <label
            htmlFor="terms"
            className="text-[10px] text-slate-400 cursor-pointer select-none leading-tight"
          >
            I agree to the Terms of Service & Privacy Policy.
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl py-2 text-xs shadow-md transition"
        >
          Create Free Account
        </button>
      </form>

      <p className="mt-3 text-center text-[11px] text-slate-500">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => goTo("login")}
          className="text-emerald-400 font-bold hover:underline"
        >
          Sign In
        </button>
      </p>
    </div>
  );
}
