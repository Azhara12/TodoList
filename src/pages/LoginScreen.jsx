import { useState } from "react";
import { loginUser } from "../services/api";

function BrandLogo() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 mb-2.5">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      </div>
      <span className="text-base font-black text-white tracking-wider uppercase">Todolist</span>
    </div>
  );
}

function Toast({ message, type }) {
  if (!message) return null;
  const colors = type === "success" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-red-500/10 border-red-500/30 text-red-400";
  return <div className={`mb-3 px-3 py-2 rounded-xl border text-[11px] font-medium text-center ${colors}`}>{message}</div>;
}

export default function LoginScreen({ setLogged, goTo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("todo_user", JSON.stringify(data));
      setToast({ type: "success", message: "Success! Signing you in..." });
      setTimeout(() => { if (typeof setLogged === "function") setLogged(true); }, 1000);
    } catch (error) {
      setToast({ type: "error", message: error.response?.data?.message || "Invalid email or password." });
    }
  }

  return (
    <div className="w-full max-w-sm bg-[#122333] border border-slate-700/50 p-5 sm:p-6 rounded-2xl shadow-2xl relative">
      <BrandLogo />
      <div className="mb-3 text-center">
        <h1 className="text-lg font-extrabold text-white tracking-tight">Sign In</h1>
        
      </div>

      <Toast {...(toast || {})} message={toast?.message} />

      <form onSubmit={handleLogin} className="space-y-3">
        <div>
          <label className="block text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
          <div className="relative">
            <input type="email" placeholder="name@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full bg-[#233545] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:ring-1.5 focus:ring-emerald-500/40 focus:border-emerald-500 transition duration-150"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
            <button type="button" onClick={() => goTo("forgot")} className="text-[10px] text-emerald-400 hover:text-emerald-300 transition">Forgot password?</button>
          </div>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full bg-[#233545] border border-slate-700 rounded-xl pl-3 pr-10 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:ring-1.5 focus:ring-emerald-500/40 focus:border-emerald-500 transition duration-150"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition">
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="flex items-center pt-0.5">
          <input id="remember_me" type="checkbox" className="w-3.5 h-3.5 rounded border-slate-700 bg-[#233545] text-emerald-600 focus:ring-0 cursor-pointer" />
          <label htmlFor="remember_me" className="ml-2 text-[11px] text-slate-400 cursor-pointer select-none">Keep me signed in</label>
        </div>

        <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl py-2 text-xs shadow-md transition active:scale-[0.98]">
          Sign In
        </button>
      </form>

      <p className="mt-4 text-center text-[11px] text-slate-500">
        Don't have an account? <button type="button" onClick={() => goTo("register")} className="text-emerald-400 font-semibold hover:underline">Create new account</button>
      </p>
    </div>
  );
}