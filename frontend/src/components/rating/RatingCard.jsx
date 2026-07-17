import { Star } from "lucide-react";

const RatingCard = ({ rating }) => {
  return (
    <div className="flex items-center gap-2">

      <Star
        className="fill-yellow-400 text-yellow-400"
        size={18}
      />

      <span className="font-semibold">
        {rating}
      </span>

    </div>
  );
};

export default RatingCard;