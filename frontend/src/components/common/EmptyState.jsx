import { PackageOpen } from "lucide-react";

const EmptyState = ({
  title = "No Data Found",
  description = "There are no records available.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/70 py-16 text-center shadow-sm">
      <PackageOpen size={56} className="mb-4 text-slate-400" />

      <h2 className="text-xl font-semibold text-slate-900">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
