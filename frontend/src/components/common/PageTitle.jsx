const PageTitle = ({ title, subtitle }) => {
  return (
    <div className="mb-6">

      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-gray-500">
          {subtitle}
        </p>
      )}

    </div>
  );
};

export default PageTitle;