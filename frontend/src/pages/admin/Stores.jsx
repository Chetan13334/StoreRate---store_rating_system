import { useEffect, useState } from "react";
import { Search, Store } from "lucide-react";

import adminService from "../../services/admin.service";

import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";
import PageTitle from "../../components/common/PageTitle";

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    sortBy: "name",
    order: "asc",
  });

  const fetchStores = async () => {
    try {
      setLoading(true);

      const response = await adminService.getStores(filters);

      setStores(response.data || response.stores || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [filters]);

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading) return <Loader />;

  return (
    <>
      <PageTitle
        title="Stores"
        subtitle="Manage all registered stores"
      />

      <Card>

        {/* Filters */}

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="Search Store..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleChange}
            className="rounded-lg border p-2"
          >
            <option value="name">Store Name</option>
            <option value="email">Email</option>
            <option value="rating">Rating</option>
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

                <th className="px-4 py-3 text-left">
                  Store
                </th>

                <th className="px-4 py-3 text-left">
                  Email
                </th>

                <th className="px-4 py-3 text-left">
                  Address
                </th>

                <th className="px-4 py-3 text-left">
                  Owner
                </th>

                <th className="px-4 py-3 text-center">
                  Rating
                </th>

              </tr>

            </thead>

            <tbody>

              {stores.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="py-10 text-center"
                  >
                    No Stores Found
                  </td>

                </tr>

              ) : (

                stores.map((store) => (

                  <tr
                    key={store.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="px-4 py-3">

                      <div className="flex items-center gap-3">

                        <Store
                          size={18}
                          className="text-blue-600"
                        />

                        <span className="font-medium">
                          {store.name}
                        </span>

                      </div>

                    </td>

                    <td className="px-4 py-3">
                      {store.email}
                    </td>

                    <td className="px-4 py-3">
                      {store.address}
                    </td>

                    <td className="px-4 py-3">
                      {store.ownerName || "N/A"}
                    </td>

                    <td className="px-4 py-3 text-center">

                      <span className="rounded-full bg-yellow-100 px-3 py-1 font-semibold text-yellow-700">
                        ⭐ {store.averageRating ?? 0}
                      </span>

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

export default Stores;