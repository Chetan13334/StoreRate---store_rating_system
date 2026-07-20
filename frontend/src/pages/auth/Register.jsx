import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BadgeCheck, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await register(form);
      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="hidden overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white lg:block">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
            <Sparkles size={16} />
            Join the platform
          </div>

          <h1 className="mt-8 max-w-md text-5xl font-black tracking-tight">
            Create your account and start using the rating system.
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
            Register once and access the store browsing flow, personal ratings, and password management with a
            clean submission-ready interface.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              ["Simple Signup", "Name, email, address, and password"],
              ["Stored Securely", "Authentication handled with JWT"],
              ["Fast Access", "Instant role-based login flow"],
              ["Responsive UI", "Works cleanly on desktop and mobile"],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-1 text-sm text-slate-300">{desc}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <BadgeCheck size={24} />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              Create account
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Register as a normal user to begin rating stores.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
            <Input label="Email" name="email" value={form.email} onChange={handleChange} />
            <Input label="Address" name="address" value={form.address} onChange={handleChange} />
            <Input
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />

            <Button loading={loading} className="mt-2 w-full" type="submit">
              Register
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?
            <Link className="ml-2 font-semibold text-blue-700 hover:text-blue-800" to="/login">
              Login
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Register;
