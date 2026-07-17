import { useEffect, useState } from "react";

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
        totalStores:
          stores.data?.length ||
          stores.stores?.length ||
          0,

        totalRatings:
          ratings.data?.length ||
          ratings.ratings?.length ||
          0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <PageTitle
        title="User Dashboard"
        subtitle="Welcome to Store Rating System"
      />

      <div className="grid gap-6 md:grid-cols-2">

        <Card>

          <p className="text-gray-500">
            Available Stores
          </p>

          <h1 className="mt-3 text-5xl font-bold text-blue-600">
            {stats.totalStores}
          </h1>

        </Card>

        <Card>

          <p className="text-gray-500">
            My Ratings
          </p>

          <h1 className="mt-3 text-5xl font-bold text-green-600">
            {stats.totalRatings}
          </h1>

        </Card>

      </div>
    </>
  );
};

export default Dashboard;