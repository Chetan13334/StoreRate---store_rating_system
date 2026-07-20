import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await login(form);

      switch (res.user.role) {
        case "ADMIN":
          navigate("/admin/dashboard");
          break;
        case "USER":
          navigate("/user/dashboard");
          break;
        case "STORE_OWNER":
          navigate("/owner/dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden overflow-hidden rounded-[2rem] border border-white/50 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-10 text-white shadow-2xl lg:block">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
            <Sparkles size={16} />
            Store Rating System
          </div>

          <h1 className="mt-8 max-w-md text-5xl font-black tracking-tight">
            Manage users, stores, and ratings in one place.
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
            A clean, role-based platform for administrators, users, and store owners with ratings, dashboards,
            search, and secure access.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              ["Role Based Access", "Admin, User, and Owner flows"],
              ["Fast Review", "Submit and update ratings quickly"],
              ["Polished Dashboard", "Simple metrics and lists"],
              ["Secure Login", "JWT-based authenticated access"],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-1 text-sm text-slate-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Sign in to continue to your dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Input label="Email" name="email" value={form.email} onChange={handleChange} />
            <Input
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />

            <Button loading={loading} type="submit" className="mt-2 w-full">
              Login
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?
            <Link className="ml-2 font-semibold text-blue-700 hover:text-blue-800" to="/register">
              Register
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
