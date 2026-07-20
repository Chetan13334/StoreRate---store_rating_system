import {
  LayoutDashboard,
  Users,
  Store,
  Star,
  UserPlus,
  LogOut,
  KeyRound,
  BadgePlus,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar = ({ mobileOpen = false, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const linkStyle = ({ isActive }) =>
    `group flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-[0_12px_28px_rgba(37,99,235,0.22)]"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:translate-x-0.5"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const sidebarBody = (
    <>
      <div className="border-b border-white/10 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/20">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900">
              Store Rating
            </h1>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
              Admin Console
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Signed in as
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-900">
            {user?.name}
          </p>
          <p className="text-xs text-slate-500">
            {user?.role?.replace("_", " ")}
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {user?.role === "ADMIN" && (
          <>
            <NavLink to="/admin/dashboard" className={linkStyle} onClick={onClose}>
              <span className="flex items-center gap-3">
                <LayoutDashboard size={18} />
                Dashboard
              </span>
              <ChevronRight size={16} className="opacity-80" />
            </NavLink>
            <NavLink to="/admin/users" className={linkStyle} onClick={onClose}>
              <span className="flex items-center gap-3">
                <Users size={18} />
                Users
              </span>
              <ChevronRight size={16} className="opacity-80" />
            </NavLink>
            <NavLink to="/admin/add-user" className={linkStyle} onClick={onClose}>
              <span className="flex items-center gap-3">
                <UserPlus size={18} />
                Add User
              </span>
              <ChevronRight size={16} className="opacity-80" />
            </NavLink>
            <NavLink to="/admin/add-store" className={linkStyle} onClick={onClose}>
              <span className="flex items-center gap-3">
                <BadgePlus size={18} />
                Add Store
              </span>
              <ChevronRight size={16} className="opacity-80" />
            </NavLink>
            <NavLink to="/admin/stores" className={linkStyle} onClick={onClose}>
              <span className="flex items-center gap-3">
                <Store size={18} />
                Stores
              </span>
              <ChevronRight size={16} className="opacity-80" />
            </NavLink>
          </>
        )}

        {user?.role === "USER" && (
          <>
            <NavLink to="/user/dashboard" className={linkStyle} onClick={onClose}>
              <span className="flex items-center gap-3">
                <LayoutDashboard size={18} />
                Dashboard
              </span>
              <ChevronRight size={16} className="opacity-80" />
            </NavLink>
            <NavLink to="/user/stores" className={linkStyle} onClick={onClose}>
              <span className="flex items-center gap-3">
                <Store size={18} />
                Stores
              </span>
              <ChevronRight size={16} className="opacity-80" />
            </NavLink>
            <NavLink to="/user/ratings" className={linkStyle} onClick={onClose}>
              <span className="flex items-center gap-3">
                <Star size={18} />
                My Ratings
              </span>
              <ChevronRight size={16} className="opacity-60" />
            </NavLink>
          </>
        )}

        {user?.role === "STORE_OWNER" && (
          <>
            <NavLink to="/owner/dashboard" className={linkStyle} onClick={onClose}>
              <span className="flex items-center gap-3">
                <LayoutDashboard size={18} />
                Dashboard
              </span>
              <ChevronRight size={16} className="opacity-60" />
            </NavLink>
            <NavLink to="/owner/ratings" className={linkStyle} onClick={onClose}>
              <span className="flex items-center gap-3">
                <Star size={18} />
                Ratings
              </span>
              <ChevronRight size={16} className="opacity-60" />
            </NavLink>
          </>
        )}

        <NavLink to="/change-password" className={linkStyle} onClick={onClose}>
          <span className="flex items-center gap-3">
            <KeyRound size={18} />
            Change Password
          </span>
          <ChevronRight size={16} className="opacity-80" />
        </NavLink>
      </nav>

      <div className="border-t border-slate-200 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-red-500 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition hover:from-rose-600 hover:to-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden h-screen w-72 flex-col border-r border-slate-200 bg-white md:flex">
        {sidebarBody}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/40 md:hidden" onClick={onClose}>
          <aside
            className="flex h-full w-72 flex-col border-r border-slate-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarBody}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
