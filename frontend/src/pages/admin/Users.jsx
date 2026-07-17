import { useEffect, useState } from "react";
import { Eye, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import adminService from "../../services/admin.service";

import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";
import PageTitle from "../../components/common/PageTitle";

const Users = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    role: "",
    sortBy: "name",
    order: "asc",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await adminService.getUsers(filters);

      setUsers(res.data || res.users || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <Loader />;

  return (
    <>
      <PageTitle
        title="Users Management"
        subtitle="View and manage all registered users"
      />

      <Card>

        {/* Filters */}

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">

          <div className="relative">

            <Search
              className="absolute left-3 top-3 text-gray-400"
              size={18}
            />

            <input
              type="text"
              name="search"
              placeholder="Search..."
              value={filters.search}
              onChange={handleChange}
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <select
            name="role"
            value={filters.role}
            onChange={handleChange}
            className="rounded-lg border p-2"
          >
            <option value="">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
            <option value="STORE_OWNER">Store Owner</option>
          </select>

          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleChange}
            className="rounded-lg border p-2"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="role">Role</option>
          </select>

          <select
            name="order"
            value={filters.order}
            onChange={handleChange}
            className="rounded-lg border p-2"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

        </div>

        {/* Table */}

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-800 text-white">

              <tr>

                <th className="px-4 py-3 text-left">Name</th>

                <th className="px-4 py-3 text-left">Email</th>

                <th className="px-4 py-3 text-left">Address</th>

                <th className="px-4 py-3 text-left">Role</th>

                <th className="px-4 py-3 text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {users.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="py-10 text-center"
                  >
                    No Users Found
                  </td>

                </tr>

              ) : (

                users.map((user) => (

                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="px-4 py-3">
                      {user.name}
                    </td>

                    <td className="px-4 py-3">
                      {user.email}
                    </td>

                    <td className="px-4 py-3">
                      {user.address}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-sm text-white
                        ${
                          user.role === "ADMIN"
                            ? "bg-red-500"
                            : user.role === "STORE_OWNER"
                            ? "bg-green-600"
                            : "bg-blue-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center">

                      <button
                        onClick={() =>
                          navigate(`/admin/users/${user.id}`)
                        }
                        className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                      >
                        <Eye size={18} />
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </Card>
    </>
  );
};

export default Users;