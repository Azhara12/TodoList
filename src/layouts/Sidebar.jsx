import React, { useRef } from "react";
import axios from "axios";

function Sidebar({ activeFilter, setActiveFilter, theme, setTheme }) {
  const categories = ["All", "General", "Work", "Study", "Personal", "Done"];
  const fileInputRef = useRef(null);

  const loggedInUser = typeof window !== "undefined" && localStorage.getItem("todo_user") 
    ? JSON.parse(localStorage.getItem("todo_user")) 
    : null;

  // 👈 Token nikalne ka aasan aur fail-safe tarika (Dono jagah dhoondega)
  const token = typeof window !== "undefined" 
    ? (localStorage.getItem("todo_token") || localStorage.getItem("token") || (loggedInUser ? loggedInUser.token : null)) 
    : null; 

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file); 
    formData.append("userId", loggedInUser?._id);

    try {
      const response = await axios.put("http://localhost:5001/api/auth/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token ? `Bearer ${token}` : "", 
        },
      });

      if (response.data) {
        const updatedUser = { ...loggedInUser, avatar: response.data.avatar || response.data.avatarUrl };
        localStorage.setItem("todo_user", JSON.stringify(updatedUser));
        window.location.reload();
      }
    } catch (error) {
      console.error("Profile update error:", error);
      // 👈 Ab aap ko exact error message dikhega screen par ke backend kya keh raha hai
      const serverMessage = error.response?.data?.message || error.message;
      alert("Profile Update Failed!\nReason: " + serverMessage);
    }
  };

  const getDotColor = (category) => {
    switch (category) {
      case "All": return "bg-emerald-400";
      case "General": return "bg-slate-400";
      case "Work": return "bg-amber-500";
      case "Study": return "bg-blue-400";
      case "Personal": return "bg-purple-400";
      case "Done": return "bg-teal-400";
      default: return "bg-emerald-400";
    }
  };

  return (
    <div className="w-64 bg-[#122333] border-r border-slate-700/40 min-h-screen p-5 flex flex-col justify-between hidden md:flex font-sans antialiased text-slate-200">
      <div>
        {/* Logo / Title */}
        <div className="flex items-center justify-between px-2 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <span className="text-white font-black text-sm tracking-wider uppercase">TD</span>
            </div>
            <span className="text-base font-black text-white tracking-wider uppercase">
              Todo List
            </span>
          </div>
        </div>

        {/* 👤 Dynamic User Profile Card */}
        {loggedInUser && (
          <div className="flex items-center gap-3 bg-[#233545]/40 border border-slate-700/30 rounded-xl p-3 mb-6">
            
            {/* 🔴 Avatar Frame */}
            <div className="relative flex-shrink-0 w-10 h-10 group cursor-pointer">
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleAvatarChange} 
                accept="image/*" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50" 
                title="Click to change profile picture"
              />

              {loggedInUser.avatar ? (
                <img
                  src={loggedInUser.avatar}
                  alt={loggedInUser.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-600/30 shadow-md group-hover:opacity-75 transition duration-150"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center font-bold text-white text-sm shadow-md group-hover:opacity-75 transition duration-150">
                  {loggedInUser.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#122333] rounded-full z-40"></span>
            </div>

            {/* Text Details */}
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-bold text-white truncate max-w-[130px]">
                {loggedInUser.name}
              </span>
              <span className="text-[9px] text-slate-400 font-medium tracking-wide mt-0.5 uppercase">
                Premium User
              </span>
            </div>

          </div>
        )}

        {/* Navigation Categories */}
        <nav className="flex flex-col gap-1.5 mb-8">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition w-full text-left cursor-pointer ${
                  isActive
                    ? "bg-[#233545] text-white shadow-md border border-slate-700/50"
                    : "text-slate-400 hover:bg-[#233545]/40 hover:text-slate-200"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${getDotColor(cat)}`} />
                {cat}
              </button>
            );
          })}
        </nav>

        {/* Settings Menu */}
        <div className="mb-4 border-t border-slate-700/40 pt-6">
          <div className="flex items-center gap-2 px-4 py-2 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Settings</span>
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <button
              onClick={() => setTheme("light")}
              type="button"
              className={`flex items-center gap-3 px-4 py-2 rounded-xl text-[11px] font-medium transition w-full text-left cursor-pointer ${
                theme === "light" ? "bg-[#233545] text-white border border-slate-700/50" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span className={`w-2 h-2 rounded-full transition-all ${theme === "light" ? "bg-emerald-500 scale-110" : "bg-slate-600"}`}></span>
              White Theme
            </button>

            <button
              onClick={() => setTheme("dark")}
              type="button"
              className={`flex items-center gap-3 px-4 py-2 rounded-xl text-[11px] font-medium transition w-full text-left cursor-pointer ${
                theme === "dark" ? "bg-gradient-to-r from-emerald-600/20 to-teal-600/20 text-emerald-400 border border-emerald-500/30" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span className={`w-2 h-2 rounded-full transition-all ${theme === "dark" ? "bg-emerald-500 scale-110" : "bg-slate-600"}`}></span>
              Dark Theme
            </button>
          </div>
        </div>
      </div>

      <div className="text-[10px] text-slate-600 text-center border-t border-slate-700/40 pt-4">
        © 2026 Todo List
      </div>
    </div>
  );
}

export default Sidebar;