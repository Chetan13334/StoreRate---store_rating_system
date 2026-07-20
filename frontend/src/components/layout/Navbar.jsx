import { Bell, Menu, Sparkles, UserCircle } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-white/75 px-4 py-4 shadow-sm backdrop-blur md:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 md:hidden"
          >
            <Menu size={20} />
          </button>

          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
              <Sparkles size={14} />
              Store Rating System
            </div>
            <h2 className="text-lg font-black tracking-tight text-slate-900 md:text-xl">
              Submission Dashboard
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <button className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
            <Bell size={20} />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            {/* <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
              <UserCircle size={26} />
            </div> */}

            {/* <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">
                {user?.name}
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                {user?.role?.replace("_", " ")}
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
