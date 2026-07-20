import { useEffect, useState } from "react";
import { Store, Star } from "lucide-react";

import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";
import PageTitle from "../../components/common/PageTitle";

import storeService from "../../services/store.service";
import ratingService from "../../services/rating.service";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const stores = await storeService.getStores();
      const ratings = await ratingService.getMyRatings();

      setStats({
        totalStores: stores.data?.length || stores.stores?.length || 0,
        totalRatings: ratings.data?.length || ratings.ratings?.length || 0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <PageTitle title="User Dashboard" subtitle="Welcome to Store Rating System" />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-600" />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Available Stores</p>
              <h1 className="mt-3 text-5xl font-black tracking-tight text-slate-900">
                {stats.totalStores}
              </h1>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <Store size={22} />
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-600 to-teal-600" />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">My Ratings</p>
              <h1 className="mt-3 text-5xl font-black tracking-tight text-slate-900">
                {stats.totalRatings}
              </h1>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <Star size={22} />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
