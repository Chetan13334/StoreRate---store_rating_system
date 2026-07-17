const Pagination = ({
  page,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="mt-6 flex justify-center gap-2">

      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`rounded px-4 py-2 ${
            page === index + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;