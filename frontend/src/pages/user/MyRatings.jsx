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
      item.storeName
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredRatings(result);
  }, [ratings, search]);

  const loadRatings = async () => {
    try {
      setLoading(true);

      const response = await ratingService.getMyRatings();

      const data =
        response.data ||
        response.ratings ||
        [];

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
      <PageTitle
        title="My Ratings"
        subtitle="Ratings submitted by you"
      />

      <Card className="mb-6">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search Store..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-lg border py-2 pl-10 pr-4"
          />

        </div>

      </Card>

      <Card>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-800 text-white">

              <tr>

                <th className="px-4 py-3 text-left">
                  Store
                </th>

                <th className="px-4 py-3 text-left">
                  Address
                </th>

                <th className="px-4 py-3 text-center">
                  Rating
                </th>

                <th className="px-4 py-3 text-center">
                  Date
                </th>

                <th className="px-4 py-3 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredRatings.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="py-10 text-center"
                  >
                    No Ratings Found
                  </td>

                </tr>

              ) : (

                filteredRatings.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="px-4 py-3 font-medium">
                      {item.storeName}
                    </td>

                    <td className="px-4 py-3">
                      {item.address}
                    </td>

                    <td className="px-4 py-3 text-center">

                      <div className="flex items-center justify-center gap-2">

                        <Star
                          size={18}
                          className="fill-yellow-400 text-yellow-400"
                        />

                        {item.rating}

                      </div>

                    </td>

                    <td className="px-4 py-3 text-center">
                      {new Date(
                        item.created_at
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3 text-center">

                      <button
                        onClick={() =>
                          setSelectedStore({
                            id: item.storeId,
                            name: item.storeName,
                            address: item.address,
                            userRating: item.rating,
                          })
                        }
                        className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
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