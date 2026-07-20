import { useEffect, useState } from "react";
import { Star, X } from "lucide-react";
import toast from "react-hot-toast";

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
      toast.error("Please select a rating.");
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

      toast.success("Rating saved successfully.");

      refresh();
      onClose();

    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to submit rating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 backdrop-blur-sm px-4">

      <div className="w-full max-w-md rounded-3xl border border-white/60 bg-white p-6 shadow-2xl">

        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            {store.userRating
              ? "Update Rating"
              : "Rate Store"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={22} />
          </button>

        </div>

        <div className="mb-5">

          <h3 className="text-xl font-bold text-slate-900">
            {store.name}
          </h3>

          <p className="text-sm text-slate-500">
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
                    ? "fill-amber-400 text-amber-400 transition drop-shadow"
                    : "text-slate-200 transition"
              }
            />
            </button>

          ))}

        </div>

        <div className="mb-6 text-center">

          <span className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/10">
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
