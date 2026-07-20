const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full rounded-xl border bg-white/90 px-4 py-3 text-slate-900 outline-none transition
          placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
          ${error ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10" : "border-slate-200"}
        `}
      />

      {error && (
        <p className="mt-2 text-sm font-medium text-rose-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
