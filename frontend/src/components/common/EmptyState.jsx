import { PackageOpen } from "lucide-react";

const EmptyState = ({
  title = "No Data Found",
  description = "There are no records available."
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">

      <PackageOpen
        size={60}
        className="mb-4 text-gray-400"
      />

      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-gray-500">
        {description}
      </p>

    </div>
  );
};

export default EmptyState;