import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <Card className="w-full max-w-md">

        <h2 className="mb-6 text-center text-3xl font-bold">
          Login
        </h2>

        <form onSubmit={handleSubmit}>

          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <Button
            loading={loading}
            type="submit"
            className="mt-2 w-full"
          >
            Login
          </Button>

        </form>

        <p className="mt-5 text-center">

          Don't have an account?

          <Link
            className="ml-2 text-blue-600"
            to="/register"
          >
            Register
          </Link>

        </p>

      </Card>

    </div>
  );
};

export default Login;