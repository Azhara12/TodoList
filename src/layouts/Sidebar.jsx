import SidebarItem from "./SidebarItem";
import ExpandSidebarItem from "./ExpandSidebarItem";

function Sidebar({ activeFilter, setActiveFilter }) {
  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-violet-700 via-purple-700 to-fuchsia-700 p-6 text-white flex-shrink-0 flex flex-col hidden lg:flex">
      {/* Logo */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight">Todo App</h1>
        </div>
        <p className="text-xs text-violet-200/80 leading-relaxed">
          Stay focused. Get things done.
        </p>
      </div>

      {/* Nav */}
      <nav className="space-y-1 flex-1">
        <SidebarItem icon="dashboard" title="Dashboard" active />
        <ExpandSidebarItem activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <SidebarItem icon="settings" title="Settings" />
      </nav>

      {/* Footer */}
      <div className="pt-6 border-t border-white/10 mt-6">
        <p className="text-xs text-violet-200/60 text-center">© {new Date().getFullYear()} TodoApp</p>
      </div>
    </aside>
  );
}

export default Sidebar;
