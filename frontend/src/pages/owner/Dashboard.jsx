import { useEffect, useState } from "react";

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
      <PageTitle
        title="Store Owner Dashboard"
        subtitle="Overview of your store"
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card>
          <p className="text-gray-500">Store Name</p>

          <h2 className="mt-3 text-2xl font-bold">
            {dashboard?.storeName || "No store assigned"}
          </h2>
        </Card>

        <Card>
          <p className="text-gray-500">Average Rating</p>

          <h2 className="mt-3 text-5xl font-bold text-yellow-500">
            ⭐ {dashboard?.averageRating || 0}
          </h2>
        </Card>

        <Card>
          <p className="text-gray-500">Total Ratings</p>

          <h2 className="mt-3 text-5xl font-bold text-blue-600">
            {dashboard?.totalRatings || 0}
          </h2>
        </Card>

        <Card>
          <p className="text-gray-500">Store Address</p>

          <h2 className="mt-3 text-lg font-semibold">
            {dashboard?.address || "-"}
          </h2>
        </Card>

      </div>

      <div className="mt-8">

        <Card>

          <h2 className="mb-4 text-xl font-bold">
            Store Information
          </h2>

          <div className="space-y-3">

            <p>
              <strong>Email:</strong> {dashboard?.email || "-"}
            </p>

            <p>
              <strong>Owner:</strong> {dashboard?.ownerName || "-"}
            </p>

            <p>
              <strong>Store ID:</strong> {dashboard?.storeId || "-"}
            </p>

          </div>

        </Card>

      </div>

    </>
  );
};

export default Dashboard;