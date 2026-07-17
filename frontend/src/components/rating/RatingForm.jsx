import { useEffect, useState } from "react";
import { Star, X } from "lucide-react";

import ratingService from "../../services/rating.service";
import Button from "../common/Button";

const RatingForm = ({
  open,
  onClose,
  store,
  refresh,
}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (store) {
      setRating(store.userRating || 0);
    }
  }, [store]);

  if (!open || !store) return null;

  const handleSubmit = async () => {
    if (!rating) {
      alert("Please select a rating.");
      return;
    }

    try {
      setLoading(true);

      if (store.userRating) {
        await ratingService.updateRating(
          store.id,
          rating
        );
      } else {
        await ratingService.submitRating({
          storeId: store.id,
          rating,
        });
      }

      alert("Rating submitted successfully.");

      refresh();
      onClose();

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Unable to submit rating."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            {store.userRating
              ? "Update Rating"
              : "Rate Store"}
          </h2>

          <button
            onClick={onClose}
            className="rounded p-1 hover:bg-gray-100"
          >
            <X size={22} />
          </button>

        </div>

        <div className="mb-5">

          <h3 className="text-xl font-semibold">
            {store.name}
          </h3>

          <p className="text-gray-500">
            {store.address}
          </p>

        </div>

        <div className="mb-8 flex justify-center gap-3">

          {[1, 2, 3, 4, 5].map((star) => (

            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                size={42}
                className={
                  star <= (hover || rating)
                    ? "fill-yellow-400 text-yellow-400 transition"
                    : "text-gray-300 transition"
                }
              />
            </button>

          ))}

        </div>

        <div className="mb-6 text-center">

          <span className="rounded-lg bg-blue-100 px-4 py-2 font-semibold text-blue-700">

            Selected Rating : {rating}

          </span>

        </div>

        <div className="flex justify-end gap-3">

          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            loading={loading}
            onClick={handleSubmit}
          >
            {store.userRating
              ? "Update"
              : "Submit"}
          </Button>

        </div>

      </div>

    </div>
  );
};

export default RatingForm;