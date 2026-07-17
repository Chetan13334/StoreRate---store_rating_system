import {
  LayoutDashboard,
  Users,
  Store,
  Star,
  UserPlus,
  LogOut,
  KeyRound,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-700 hover:text-white"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="flex h-screen w-64 flex-col bg-slate-900">

      <div className="border-b border-slate-700 p-6">

        <h1 className="text-2xl font-bold text-white">
          ⭐ Store Rating
        </h1>

      </div>

      <nav className="flex-1 space-y-2 p-4">

        {user?.role === "ADMIN" && (
          <>
            <NavLink to="/admin/dashboard" className={linkStyle}>
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink to="/admin/users" className={linkStyle}>
              <Users size={18} />
              Users
            </NavLink>

            <NavLink to="/admin/add-user" className={linkStyle}>
              <UserPlus size={18} />
              Add User
            </NavLink>

            <NavLink to="/admin/add-store" className={linkStyle}>
              <Store size={18} />
              Add Store
            </NavLink>

            <NavLink to="/admin/stores" className={linkStyle}>
              <Store size={18} />
              Stores
            </NavLink>
          </>
        )}

        {user?.role === "USER" && (
          <>
            <NavLink to="/user/dashboard" className={linkStyle}>
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink to="/user/stores" className={linkStyle}>
              <Store size={18} />
              Stores
            </NavLink>

            <NavLink to="/user/ratings" className={linkStyle}>
              <Star size={18} />
              My Ratings
            </NavLink>
          </>
        )}

        {user?.role === "STORE_OWNER" && (
          <>
            <NavLink to="/owner/dashboard" className={linkStyle}>
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink to="/owner/ratings" className={linkStyle}>
              <Star size={18} />
              Ratings
            </NavLink>
          </>
        )}

        <NavLink to="/change-password" className={linkStyle}>
          <KeyRound size={18} />
          Change Password
        </NavLink>

      </nav>

      <div className="border-t border-slate-700 p-4">

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-3 font-medium text-white transition hover:bg-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;
