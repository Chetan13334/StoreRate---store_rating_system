const PageTitle = ({ title, subtitle }) => {
  return (
    <div className="mb-6 rounded-2xl border border-white/60 bg-white/70 px-5 py-4 shadow-sm backdrop-blur">
      <h1 className="text-3xl font-black tracking-tight text-slate-900">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-sm text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageTitle;
