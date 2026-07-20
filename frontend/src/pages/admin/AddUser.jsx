import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import PageTitle from "../../components/common/PageTitle";

import adminService from "../../services/admin.service";

const AddUser = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "USER",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validate = () => {
    const validationErrors = {};

    if (!form.name.trim()) {
      validationErrors.name = "Name is required";
    } else if (form.name.length < 3) {
      validationErrors.name = "Name must be at least 3 characters";
    }

    if (!form.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      validationErrors.email = "Invalid email address";
    }

    if (!form.address.trim()) {
      validationErrors.address = "Address is required";
    }

    if (!form.password) {
      validationErrors.password = "Password is required";
    } else if (form.password.length < 8 || form.password.length > 16) {
      validationErrors.password =
        "Password must be between 8 and 16 characters";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await adminService.createUser(form);

      toast.success("User created successfully");

      navigate("/admin/users");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTitle
        title="Add New User"
        subtitle="Create a new user, admin or store owner"
      />

      <Card className="max-w-3xl">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            error={errors.address}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          <div>

            <label className="mb-2 block font-medium">
              Role
            </label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 outline-none"
            >
              <option value="USER">User</option>
              <option value="STORE_OWNER">
                Store Owner
              </option>
              <option value="ADMIN">Admin</option>
            </select>

          </div>

          <div className="flex justify-end gap-3 pt-4">

            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/admin/users")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              loading={loading}
            >
              Create User
            </Button>

          </div>

        </form>

      </Card>
    </>
  );
};

export default AddUser;
