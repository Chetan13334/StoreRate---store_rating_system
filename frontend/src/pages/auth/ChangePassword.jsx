import { useState } from "react";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import authService from "../../services/auth.service";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await authService.changePassword(form);

      alert("Password Updated");

      setForm({
        currentPassword: "",
        newPassword: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-lg">

      <h2 className="mb-6 text-2xl font-bold">
        Change Password
      </h2>

      <form onSubmit={submit}>

        <Input
          label="Current Password"
          type="password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
        />

        <Input
          label="New Password"
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
        />

        <Button
          loading={loading}
          type="submit"
        >
          Update Password
        </Button>

      </form>

    </Card>
  );
};

export default ChangePassword;