import { useEffect, useState } from "react";
import { Search, Star } from "lucide-react";

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
        item.userName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.userEmail
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });

    setFilteredRatings(filtered);
  }, [search, ratings]);

  const loadRatings = async () => {
    try {
      setLoading(true);

      const response = await ownerService.getRatings();

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
        title="Store Ratings"
        subtitle="Ratings received for your store"
      />

      <Card className="mb-6">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search User..."
            className="w-full rounded-lg border py-2 pl-10 pr-4"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </Card>

      <Card>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-800 text-white">

              <tr>

                <th className="px-4 py-3 text-left">
                  User
                </th>

                <th className="px-4 py-3 text-left">
                  Email
                </th>

                <th className="px-4 py-3 text-center">
                  Rating
                </th>

                <th className="px-4 py-3 text-center">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredRatings.length === 0 ? (

                <tr>

                  <td
                    colSpan={4}
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
                      {item.userName}
                    </td>

                    <td className="px-4 py-3">
                      {item.userEmail}
                    </td>

                    <td className="px-4 py-3 text-center">

                      <div className="flex items-center justify-center gap-2">

                        <Star
                          size={18}
                          className="fill-yellow-400 text-yellow-400"
                        />

                        <span className="font-semibold">
                          {item.rating}
                        </span>

                      </div>

                    </td>

                    <td className="px-4 py-3 text-center">
                      {new Date(
                        item.created_at
                      ).toLocaleDateString()}
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