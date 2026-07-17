import { useEffect, useState } from "react";
import { Search, Star } from "lucide-react";

import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";
import PageTitle from "../../components/common/PageTitle";
import RatingForm from "../../components/rating/RatingForm";

import storeService from "../../services/store.service";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadStores();
  }, []);

  useEffect(() => {
    const result = stores.filter((store) => {
      return (
        store.name.toLowerCase().includes(search.toLowerCase()) ||
        store.address.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredStores(result);
  }, [search, stores]);

  const loadStores = async () => {
    try {
      setLoading(true);

      const response = await storeService.getStores();

      const data = response.data || response.stores || [];

      setStores(data);
      setFilteredStores(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <PageTitle
        title="Available Stores"
        subtitle="Browse stores and submit your ratings"
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
            className="w-full rounded-lg border py-2 pl-10 pr-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredStores.length === 0 ? (
          <Card>
            <p className="text-center">No Stores Found</p>
          </Card>
        ) : (
          filteredStores.map((store) => (
            <Card key={store.id}>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">{store.name}</h2>

                <p className="text-gray-500">{store.address}</p>

                <p className="text-gray-500">{store.email}</p>

                <div className="flex items-center gap-2">
                  <Star
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="font-semibold">
                    {store.averageRating ?? store.average_rating ?? 0}
                  </span>
                </div>

                {store.userRating !== undefined &&
                  store.userRating !== null && (
                    <div className="rounded-lg bg-blue-100 p-2 text-blue-700">
                      Your Rating : <strong>{store.userRating}</strong>
                    </div>
                  )}

                <Button
                  className="w-full"
                  onClick={() => setSelectedStore(store)}
                >
                  {store.userRating !== undefined &&
                  store.userRating !== null
                    ? "Update Rating"
                    : "Rate Store"}
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      <RatingForm
        open={!!selectedStore}
        store={selectedStore}
        onClose={() => setSelectedStore(null)}
        refresh={loadStores}
      />
    </>
  );
};

export default StoreList;
