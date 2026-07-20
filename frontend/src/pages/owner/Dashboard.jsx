import { useEffect, useState } from "react";
import { Store, Star, Users } from "lucide-react";

import ownerService from "../../services/owner.service";

import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";
import PageTitle from "../../components/common/PageTitle";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const response = await ownerService.getDashboard();
      setDashboard(response.data || response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <PageTitle title="Store Owner Dashboard" subtitle="Overview of your store" />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-900 to-slate-700" />
          <p className="text-sm font-medium text-slate-500">Store Name</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <Store size={22} />
            </div>
            <h2 className="text-xl font-black text-slate-900">
              {dashboard?.storeName || "No store assigned"}
            </h2>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
          <p className="text-sm font-medium text-slate-500">Average Rating</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <Star size={22} />
            </div>
            <h2 className="text-5xl font-black tracking-tight text-slate-900">
              {dashboard?.averageRating || 0}
            </h2>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-600" />
          <p className="text-sm font-medium text-slate-500">Total Ratings</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <Users size={22} />
            </div>
            <h2 className="text-5xl font-black tracking-tight text-slate-900">
              {dashboard?.totalRatings || 0}
            </h2>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-600 to-fuchsia-600" />
          <p className="text-sm font-medium text-slate-500">Store Address</p>
          <h2 className="mt-3 text-lg font-semibold text-slate-900">
            {dashboard?.address || "-"}
          </h2>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            Store Information
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Email", dashboard?.email || "-"],
              ["Owner", dashboard?.ownerName || "-"],
              ["Store ID", dashboard?.storeId || "-"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 font-semibold text-slate-900">{value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
