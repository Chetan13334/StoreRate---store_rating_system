import { useEffect, useState } from "react";

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

  return (
    <>

      <PageTitle
        title="Admin Dashboard"
        subtitle="Overview of Store Rating System"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card>

          <h3 className="text-gray-500">
            Total Users
          </h3>

          <h1 className="mt-3 text-4xl font-bold text-blue-600">
            {dashboard?.totalUsers ?? 0}
          </h1>

        </Card>

        <Card>

          <h3 className="text-gray-500">
            Total Stores
          </h3>

          <h1 className="mt-3 text-4xl font-bold text-green-600">
            {dashboard?.totalStores ?? 0}
          </h1>

        </Card>

        <Card>

          <h3 className="text-gray-500">
            Total Ratings
          </h3>

          <h1 className="mt-3 text-4xl font-bold text-yellow-500">
            {dashboard?.totalRatings ?? 0}
          </h1>

        </Card>

        <Card>

          <h3 className="text-gray-500">
            Store Owners
          </h3>

          <h1 className="mt-3 text-4xl font-bold text-purple-600">
            {dashboard?.totalOwners ?? 0}
          </h1>

        </Card>

      </div>

      <div className="mt-8">

        <Card>

          <h2 className="mb-4 text-xl font-semibold">
            System Summary
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <p className="text-gray-500">
                Registered Users
              </p>

              <p className="text-2xl font-bold">
                {dashboard?.totalUsers ?? 0}
              </p>

            </div>

            <div>

              <p className="text-gray-500">
                Registered Stores
              </p>

              <p className="text-2xl font-bold">
                {dashboard?.totalStores ?? 0}
              </p>

            </div>

            <div>

              <p className="text-gray-500">
                Ratings Submitted
              </p>

              <p className="text-2xl font-bold">
                {dashboard?.totalRatings ?? 0}
              </p>

            </div>

            <div>

              <p className="text-gray-500">
                Active Owners
              </p>

              <p className="text-2xl font-bold">
                {dashboard?.totalOwners ?? 0}
              </p>

            </div>

          </div>

        </Card>

      </div>

    </>
  );
};

export default Dashboard;