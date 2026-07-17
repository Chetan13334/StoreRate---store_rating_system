import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  MapPin,
  Shield,
  Store,
  Star,
  ArrowLeft,
} from "lucide-react";

import adminService from "../../services/admin.service";

import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";
import PageTitle from "../../components/common/PageTitle";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);

      const response = await adminService.getUserDetails(id);

      setUser(response.data || response.user || response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading) return <Loader />;

  if (!user) {
    return (
      <Card>
        <h2 className="text-xl font-semibold text-red-500">
          User not found
        </h2>
      </Card>
    );
  }

  return (
    <>
      <PageTitle
        title="User Details"
        subtitle="Complete information about the selected user"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="text-center">
          <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-blue-100">
            <User size={55} className="text-blue-600" />
          </div>

          <h2 className="text-2xl font-bold">{user.name}</h2>

          <p className="mt-2 text-gray-500">{user.email}</p>

          <div className="mt-6">
            <span
              className={`rounded-full px-4 py-2 text-white font-semibold ${
                user.role === "ADMIN"
                  ? "bg-red-500"
                  : user.role === "STORE_OWNER"
                  ? "bg-green-600"
                  : "bg-blue-600"
              }`}
            >
              {user.role}
            </span>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="mb-6 text-xl font-bold">Personal Information</h2>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <User className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-semibold">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-semibold">{user.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Shield className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-semibold">{user.role}</p>
                </div>
              </div>
            </div>
          </Card>

          {user.role === "STORE_OWNER" && (
            <Card>
              <h2 className="mb-6 text-xl font-bold">Store Information</h2>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <Store className="text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Store Name</p>
                    <p className="font-semibold">
                      {user.storeName || user.store?.name || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Star className="text-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-500">Average Rating</p>
                    <p className="font-semibold">⭐ {user.averageRating || 0}</p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <div>
            <Button variant="secondary" onClick={() => navigate("/admin/users")}>
              <ArrowLeft size={18} className="mr-2 inline" />
              Back to Users
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
