import { useState } from "react";

// ─── Shared brand icon ───────────────────────────────────────────────────────
function BrandLogo() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      </div>
      <span className="text-xl font-bold text-white tracking-wide">Todolist</span>
    </div>
  );
}

// ─── Left decorative panel ────────────────────────────────────────────────────
function LeftPanel() {
  return (
    <div className="hidden md:flex md:w-1/2 lg:w-[55%] relative items-center justify-center bg-gradient-to-br from-[#1b1530] via-[#0f0e13] to-[#0a0812] overflow-hidden p-12 border-r border-[#2e2646]/30">
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-violet-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full bg-fuchsia-600/10 blur-[120px] pointer-events-none" />
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center">
        <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(139,92,246,0.15)] border border-white/10 bg-black/40 backdrop-blur-md mb-10 flex items-center justify-center">
          <svg className="w-40 h-40 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7l-3 3-1.5-1.5" />
          </svg>
        </div>
        <span className="text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold mb-3">Boost Your Productivity</span>
        <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug">
          Streamline your daily tasks <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
            with beautiful simplicity
          </span>
        </h2>
        <p className="mt-4 text-sm text-slate-400 max-w-sm leading-relaxed">
          Create tasks, organize workflows, and track your daily progress in a workspace designed for focus.
        </p>
      </div>
      <div className="absolute bottom-6 text-xs text-slate-500 tracking-wider">
        © {new Date().getFullYear()} TodoList Corp. All rights reserved.
      </div>
    </div>
  );
}

// ─── Toast notification ───────────────────────────────────────────────────────
function Toast({ message, type }) {
  if (!message) return null;
  const colors = type === "success"
    ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
    : "bg-red-500/20 border-red-500/40 text-red-300";
  return (
    <div className={`mb-5 px-4 py-3 rounded-xl border text-xs font-medium ${colors}`}>
      {message}
    </div>
  );
}

// ─── Input field helper ───────────────────────────────────────────────────────
function InputField({ id, label, type, placeholder, value, onChange, icon, rightSlot }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={id} className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          {label}
        </label>
        {rightSlot}
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
          {icon}
        </div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          className="w-full bg-[#17161e] border border-[#2e2646]/50 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition duration-200"
        />
      </div>
    </div>
  );
}

const EmailIcon = (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
  </svg>
);

const LockIcon = (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const UserIcon = (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
function LoginScreen({ setLogged, goTo, registeredUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);

  function handleLogin(e) {
    e.preventDefault();
    
    if (!registeredUser || registeredUser.email !== email || registeredUser.password !== password) {
      setToast({ type: "error", message: "Your email or password is not correct." });
      return;
    }

    setToast({ type: "success", message: "Success! Signing you in..." });
    setTimeout(() => {
      if (typeof setLogged === "function") {
        setLogged(true);
      } else {
        console.error("Error: setLogged is not passed correctly from Parent Component!");
      }
    }, 1000);
  }

  return (
    <div className="w-full max-w-md">
      <BrandLogo />
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Sign in</h1>
        <p className="text-sm text-slate-400 mt-2">Enter your credentials to access your task dashboard.</p>
      </div>

      <Toast {...(toast || {})} message={toast?.message} />

      <form onSubmit={handleLogin} className="space-y-5">
        <InputField id="email" label="Email Address" type="email" placeholder="name@domain.com"
          value={email} onChange={e => setEmail(e.target.value)} icon={EmailIcon} />

        <InputField id="password" label="Password" type="password" placeholder="••••••••"
          value={password} onChange={e => setPassword(e.target.value)} icon={LockIcon}
          rightSlot={
            <button type="button" onClick={() => goTo("forgot")}
              className="text-xs text-violet-400 hover:text-violet-300 hover:underline transition">
              Forgot password?
            </button>
          }
        />

        <div className="flex items-center">
          <input id="remember_me" type="checkbox"
            className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-violet-600" />
          <label htmlFor="remember_me" className="ml-2 text-xs text-slate-400 cursor-pointer select-none">
            Keep me signed in
          </label>
        </div>

        <button type="submit"
          className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl py-3 text-sm shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transform hover:-translate-y-0.5 transition duration-200">
          Sign In
        </button>
      </form>

      <p className="mt-8 text-center text-xs text-slate-500">
        Don't have an account yet?{" "}
        <button type="button" onClick={() => goTo("register")}
          className="text-violet-400 hover:text-violet-300 font-semibold hover:underline transition">
          Create an account
        </button>
      </p>
    </div>
  );
}

// ─── FORGOT PASSWORD SCREEN ───────────────────────────────────────────────────
function ForgotPasswordScreen({ goTo, registeredUser, setRegisteredUser }) {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toast, setToast] = useState(null);

  function handleReset(e) {
    e.preventDefault();

    if (!registeredUser || registeredUser.email !== email || registeredUser.password !== oldPassword) {
      setToast({ type: "error", message: "Invalid email or current password." });
      return;
    }
    if (newPassword.length < 8) {
      setToast({ type: "error", message: "New password must be at least 8 characters." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setToast({ type: "error", message: "Passwords do not match. Please try again." });
      return;
    }
    if (newPassword === oldPassword) {
      setToast({ type: "error", message: "New password must be different from your old password." });
      return;
    }

    const updatedUser = { ...registeredUser, password: newPassword };
    setRegisteredUser(updatedUser);
    localStorage.setItem("todo_user", JSON.stringify(updatedUser));

    setToast({ type: "success", message: "Password changed successfully! You can now sign in." });
    setTimeout(() => goTo("login"), 2000);
  }

  return (
    <div className="w-full max-w-md">
      <BrandLogo />

      <button type="button" onClick={() => goTo("login")}
        className="flex items-center gap-2 text-xs text-slate-400 hover:text-violet-400 transition mb-6">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Sign In
      </button>

      <div className="mb-8">
        <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Reset Password</h1>
        <p className="text-sm text-slate-400 mt-2">Enter your email and set a new password below.</p>
      </div>

      <Toast {...(toast || {})} message={toast?.message} />

      <form onSubmit={handleReset} className="space-y-5">
        <InputField id="fp-email" label="Email Address" type="email" placeholder="name@domain.com"
          value={email} onChange={e => setEmail(e.target.value)} icon={EmailIcon} />

        <div className="border-t border-[#2e2646]/30 pt-5">
          <p className="text-xs text-slate-500 mb-4 uppercase tracking-wider font-semibold">Change Password</p>

          <div className="space-y-4">
            <InputField id="old-password" label="Old Password" type="password" placeholder="Enter current password"
              value={oldPassword} onChange={e => setOldPassword(e.target.value)} icon={LockIcon} />

            <InputField id="new-password" label="New Password" type="password" placeholder="Min. 8 characters"
              value={newPassword} onChange={e => setNewPassword(e.target.value)} icon={LockIcon} />

            <InputField id="confirm-password" label="Confirm New Password" type="password" placeholder="Repeat new password"
              value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} icon={LockIcon} />
          </div>
        </div>

        <button type="submit"
          className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl py-3 text-sm shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transform hover:-translate-y-0.5 transition duration-200">
          Reset Password
        </button>
      </form>
    </div>
  );
}

// ─── CREATE ACCOUNT SCREEN ────────────────────────────────────────────────────
function RegisterScreen({ goTo, setRegisteredUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [toast, setToast] = useState(null);

  function handleRegister(e) {
    e.preventDefault();

    if (password.length < 8) {
      setToast({ type: "error", message: "Password must be at least 8 characters." });
      return;
    }
    if (password !== confirm) {
      setToast({ type: "error", message: "Passwords do not match." });
      return;
    }
    if (!agreed) {
      setToast({ type: "error", message: "Please agree to the Terms & Privacy Policy." });
      return;
    }

    const newUser = { name, email, password };
    setRegisteredUser(newUser);
    localStorage.setItem("todo_user", JSON.stringify(newUser));

    setToast({ type: "success", message: `Account created for ${name}! Redirecting to sign in…` });
    setTimeout(() => goTo("login"), 2000);
  }

  const strength = password.length === 0 ? 0
    : password.length < 6 ? 1
    : password.length < 10 ? 2
    : /[A-Z]/.test(password) && /[0-9]/.test(password) ? 4 : 3;

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", "bg-red-500", "bg-yellow-500", "bg-blue-400", "bg-emerald-500"];

  return (
    <div className="w-full max-w-md">
      <BrandLogo />

      <button type="button" onClick={() => goTo("login")}
        className="flex items-center gap-2 text-xs text-slate-400 hover:text-violet-400 transition mb-6">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Sign In
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Create account</h1>
        <p className="text-sm text-slate-400 mt-2">Join thousands of people staying organized every day.</p>
      </div>

      <Toast {...(toast || {})} message={toast?.message} />

      <form onSubmit={handleRegister} className="space-y-5">
        <InputField id="reg-name" label="Full Name" type="text" placeholder="John Doe"
          value={name} onChange={e => setName(e.target.value)} icon={UserIcon} />

        <InputField id="reg-email" label="Email Address" type="email" placeholder="name@domain.com"
          value={email} onChange={e => setEmail(e.target.value)} icon={EmailIcon} />

        <div>
          <label htmlFor="reg-password" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              {LockIcon}
            </div>
            <input id="reg-password" type="password" placeholder="Min. 8 characters" value={password}
              onChange={e => setPassword(e.target.value)} required
              className="w-full bg-[#17161e] border border-[#2e2646]/50 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition duration-200" />
          </div>
          {password.length > 0 && (
            <div className="mt-2 flex items-center gap-3">
              <div className="flex-1 flex gap-1">
                {[1, 2, 3, 4].map(i => (
                  <div key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor[strength] : "bg-slate-700"}`} />
                ))}
              </div>
              <span className={`text-xs font-medium ${strength <= 1 ? "text-red-400" : strength === 2 ? "text-yellow-400" : strength === 3 ? "text-blue-400" : "text-emerald-400"}`}>
                {strengthLabel[strength]}
              </span>
            </div>
          )}
        </div>

        <InputField id="reg-confirm" label="Confirm Password" type="password" placeholder="Repeat your password"
          value={confirm} onChange={e => setConfirm(e.target.value)} icon={LockIcon} />

        <div className="flex items-start gap-3">
          <input id="terms" type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-800 text-violet-600 flex-shrink-0" />
          <label htmlFor="terms" className="text-xs text-slate-400 cursor-pointer leading-relaxed">
            I agree to the{" "}
            <a href="#" className="text-violet-400 hover:text-violet-300 hover:underline">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="text-violet-400 hover:text-violet-300 hover:underline">Privacy Policy</a>
          </label>
        </div>

        <button type="submit"
          className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl py-3 text-sm shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transform hover:-translate-y-0.5 transition duration-200">
          Create Account
        </button>
      </form>

      <p className="mt-8 text-center text-xs text-slate-500">
        Already have an account?{" "}
        <button type="button" onClick={() => goTo("login")}
          className="text-violet-400 hover:text-violet-300 font-semibold hover:underline transition">
          Sign in
        </button>
      </p>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function Login({ setLogged }) {
  const [screen, setScreen] = useState("login");
  
  const [registeredUser, setRegisteredUser] = useState(() => {
    const savedUser = localStorage.getItem("todo_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  return (
    <div className="min-h-screen w-full flex bg-[#0f0e13] font-sans antialiased text-slate-200">
      <LeftPanel />

      {/* Right Panel */}
      <div className="w-full md:w-1/2 lg:w-[45%] flex flex-col justify-center items-center px-6 py-12 sm:px-12 lg:px-16 bg-[#0f0e13] relative overflow-y-auto">
        <div className="md:hidden absolute top-0 right-0 w-80 h-80 rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />

        {screen === "login" && (
          <LoginScreen setLogged={setLogged} goTo={setScreen} registeredUser={registeredUser} />
        )}
        {screen === "forgot" && (
          <ForgotPasswordScreen goTo={setScreen} registeredUser={registeredUser} setRegisteredUser={setRegisteredUser} />
        )}
        {screen === "register" && (
          <RegisterScreen goTo={setScreen} setRegisteredUser={setRegisteredUser} />
        )}
      </div>
    </div>
  );
}