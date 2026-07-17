import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await register(form);

      alert("Registration Successful");

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <Card className="w-full max-w-lg">

        <h2 className="mb-6 text-center text-3xl font-bold">
          Register
        </h2>

        <form onSubmit={handleSubmit}>

          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            label="Address"
            name="address"
            value={form.address}
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
            className="w-full"
            type="submit"
          >
            Register
          </Button>

        </form>

        <p className="mt-4 text-center">

          Already have an account?

          <Link
            className="ml-2 text-blue-600"
            to="/login"
          >
            Login
          </Link>

        </p>

      </Card>

    </div>
  );
};

export default Register;