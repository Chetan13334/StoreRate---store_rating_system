import { useEffect, useState } from "react";
import { Users, Store, Star, ShieldCheck } from "lucide-react";

import adminService from "../../services/admin.service";

import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";
import PageTitle from "../../components/common/PageTitle";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const res = await adminService.getDashboard();
      setDashboard(res.data || res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const metrics = [
    {
      label: "Total Users",
      value: dashboard?.totalUsers ?? 0,
      icon: Users,
      accent: "from-blue-600 to-cyan-600",
    },
    {
      label: "Total Stores",
      value: dashboard?.totalStores ?? 0,
      icon: Store,
      accent: "from-emerald-600 to-teal-600",
    },
    {
      label: "Total Ratings",
      value: dashboard?.totalRatings ?? 0,
      icon: Star,
      accent: "from-amber-500 to-orange-500",
    },
    {
      label: "Store Owners",
      value: dashboard?.totalOwners ?? 0,
      icon: ShieldCheck,
      accent: "from-violet-600 to-fuchsia-600",
    },
  ];

  return (
    <>
      <PageTitle
        title="Admin Dashboard"
        subtitle="Overview of Store Rating System"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, icon: Icon, accent }) => (
          <Card key={label} className="relative overflow-hidden">
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">
                  {value}
                </h1>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r ${accent} text-white shadow-lg`}>
                <Icon size={22} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            System Summary
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Registered Users", dashboard?.totalUsers ?? 0],
              ["Registered Stores", dashboard?.totalStores ?? 0],
              ["Ratings Submitted", dashboard?.totalRatings ?? 0],
              ["Active Owners", dashboard?.totalOwners ?? 0],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-2xl font-black text-slate-900">{value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
