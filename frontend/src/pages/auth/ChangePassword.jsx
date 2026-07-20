import { useState } from "react";
import { KeyRound } from "lucide-react";
import toast from "react-hot-toast";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import PageTitle from "../../components/common/PageTitle";
import authService from "../../services/auth.service";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await authService.changePassword(form);
      toast.success("Password updated");
      setForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTitle
        title="Change Password"
        subtitle="Keep your account secure with a strong password."
      />

      <Card className="max-w-xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <KeyRound size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Update credentials</h2>
            <p className="text-sm text-slate-500">Use a password that meets the validation rules.</p>
          </div>
        </div>

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

          <Button loading={loading} type="submit">
            Update Password
          </Button>
        </form>
      </Card>
    </>
  );
};

export default ChangePassword;
