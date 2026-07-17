import { Bell, UserCircle } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">

      <div>
        <h2 className="text-xl font-bold text-slate-700">
          Store Rating System
        </h2>
      </div>

      <div className="flex items-center gap-6">

        <button className="relative">
          <Bell size={22} />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3">

          <UserCircle size={40} className="text-blue-600" />

          <div>
            <p className="font-semibold">
              {user?.name}
            </p>

            <p className="text-sm text-gray-500">
              {user?.role}
            </p>
          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;