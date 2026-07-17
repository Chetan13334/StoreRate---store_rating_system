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
        <label className="mb-2 block text-sm font-semibold text-gray-700">
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
          w-full
          rounded-lg
          border
          px-4
          py-3
          outline-none
          transition

          ${
            error
              ? "border-red-500"
              : "border-gray-300 focus:border-blue-500"
          }
        `}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}

    </div>
  );
};

export default Input;