import { useEffect, useState } from "react";
import { Search, Store, Star } from "lucide-react";

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
      <PageTitle title="Stores" subtitle="Manage all registered stores" />

      <Card>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-500 text-white">
            <Store size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Store Records</h3>
            <p className="text-sm text-slate-500">
              Search, sort, and review store ratings at a glance.
            </p>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="Search Store..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleChange}
            className="rounded-xl border border-slate-200 bg-white p-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="name">Store Name</option>
            <option value="email">Email</option>
            <option value="average_rating">Rating</option>
          </select>

          <select
            name="order"
            value={filters.order}
            onChange={handleChange}
            className="rounded-xl border border-slate-200 bg-white p-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-100">
          <table className="min-w-full">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="px-5 py-4 text-left">Store</th>
                <th className="px-5 py-4 text-left">Email</th>
                <th className="px-5 py-4 text-left">Address</th>
                <th className="px-5 py-4 text-left">Owner</th>
                <th className="px-5 py-4 text-center">Rating</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {stores.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    No Stores Found
                  </td>
                </tr>
              ) : (
                stores.map((store) => (
                  <tr key={store.id} className="border-b border-slate-100 transition hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                          <Store size={18} />
                        </div>
                        <span className="font-semibold text-slate-900">{store.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{store.email}</td>
                    <td className="px-5 py-4 text-slate-600">{store.address}</td>
                    <td className="px-5 py-4 text-slate-600">{store.ownerName || store.owner_name || "N/A"}</td>
                    <td className="px-5 py-4 text-center">
                      <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-700">
                        <Star size={16} className="fill-amber-500 text-amber-500" />
                        {store.averageRating ?? store.average_rating ?? 0}
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
