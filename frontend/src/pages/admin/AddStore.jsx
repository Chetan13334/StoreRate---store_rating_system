import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import PageTitle from "../../components/common/PageTitle";

import adminService from "../../services/admin.service";

const AddStore = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: "",
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
    const nextErrors = {};

    if (!form.name.trim() || form.name.length < 20 || form.name.length > 60) {
      nextErrors.name = "Name must be between 20 and 60 characters";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    }

    if (!form.address.trim() || form.address.length > 400) {
      nextErrors.address = "Address must be at most 400 characters";
    }

    if (!form.owner_id.trim()) {
      nextErrors.owner_id = "Owner ID is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      await adminService.createStore({
        ...form,
        owner_id: Number(form.owner_id),
      });
      toast.success("Store created successfully");
      navigate("/admin/stores");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create store.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTitle
        title="Add New Store"
        subtitle="Create a store and assign it to a store owner"
      />

      <Card className="max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Store Name"
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
            label="Store Owner ID"
            name="owner_id"
            value={form.owner_id}
            onChange={handleChange}
            error={errors.owner_id}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/admin/stores")}
            >
              Cancel
            </Button>

            <Button type="submit" loading={loading}>
              Create Store
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default AddStore;
