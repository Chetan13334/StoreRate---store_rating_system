import { useEffect, useState } from "react";
import { Search, Star, Edit } from "lucide-react";

import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";
import PageTitle from "../../components/common/PageTitle";
import RatingForm from "../../components/rating/RatingForm";

import ratingService from "../../services/rating.service";

const MyRatings = () => {
  const [ratings, setRatings] = useState([]);
  const [filteredRatings, setFilteredRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadRatings();
  }, []);

  useEffect(() => {
    const result = ratings.filter((item) =>
      item.storeName?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRatings(result);
  }, [ratings, search]);

  const loadRatings = async () => {
    try {
      setLoading(true);
      const response = await ratingService.getMyRatings();
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
      <PageTitle title="My Ratings" subtitle="Ratings submitted by you" />

      <Card className="mb-6">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search Store..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="px-5 py-4 text-left">Store</th>
                <th className="px-5 py-4 text-left">Address</th>
                <th className="px-5 py-4 text-center">Rating</th>
                <th className="px-5 py-4 text-center">Date</th>
                <th className="px-5 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredRatings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    No Ratings Found
                  </td>
                </tr>
              ) : (
                filteredRatings.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 transition hover:bg-slate-50">
                    <td className="px-5 py-4 font-semibold text-slate-900">{item.storeName}</td>
                    <td className="px-5 py-4 text-slate-600">{item.address}</td>
                    <td className="px-5 py-4 text-center">
                      <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-700">
                        <Star size={16} className="fill-amber-500 text-amber-500" />
                        {item.rating}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center text-slate-600">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() =>
                          setSelectedStore({
                            id: item.storeId,
                            name: item.storeName,
                            address: item.address,
                            userRating: item.rating,
                          })
                        }
                        className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 p-3 text-white shadow-lg shadow-blue-600/20 transition hover:scale-[1.02]"
                      >
                        <Edit size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <RatingForm
        open={!!selectedStore}
        store={selectedStore}
        onClose={() => setSelectedStore(null)}
        refresh={loadRatings}
      />
    </>
  );
};

export default MyRatings;
