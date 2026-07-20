import { useEffect, useState } from "react";
import { Search, Star, BadgeInfo } from "lucide-react";

import ownerService from "../../services/owner.service";

import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";
import PageTitle from "../../components/common/PageTitle";

const Ratings = () => {
  const [ratings, setRatings] = useState([]);
  const [filteredRatings, setFilteredRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadRatings();
  }, []);

  useEffect(() => {
    const filtered = ratings.filter((item) => {
      return (
        item.userName?.toLowerCase().includes(search.toLowerCase()) ||
        item.userEmail?.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredRatings(filtered);
  }, [search, ratings]);

  const loadRatings = async () => {
    try {
      setLoading(true);
      const response = await ownerService.getRatings();
      const data = response.data || response.ratings || [];
      setRatings(data);
      setFilteredRatings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <PageTitle title="Store Ratings" subtitle="Ratings received for your store" />

      <Card className="mb-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white">
            <BadgeInfo size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Incoming Feedback</h3>
            <p className="text-sm text-slate-500">
              Review every rating submitted by customers.
            </p>
          </div>
        </div>

        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search User..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="px-5 py-4 text-left">User</th>
                <th className="px-5 py-4 text-left">Email</th>
                <th className="px-5 py-4 text-center">Rating</th>
                <th className="px-5 py-4 text-center">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredRatings.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500">
                    No Ratings Found
                  </td>
                </tr>
              ) : (
                filteredRatings.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 transition hover:bg-slate-50">
                    <td className="px-5 py-4 font-semibold text-slate-900">{item.userName}</td>
                    <td className="px-5 py-4 text-slate-600">{item.userEmail}</td>
                    <td className="px-5 py-4 text-center">
                      <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-700">
                        <Star size={16} className="fill-amber-500 text-amber-500" />
                        {item.rating}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center text-slate-600">
                      {new Date(item.created_at).toLocaleDateString()}
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

export default Ratings;
