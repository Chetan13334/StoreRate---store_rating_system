const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        rounded-2xl
        border border-white/60
        bg-white/80
        p-6
        shadow-[0_16px_40px_rgba(15,23,42,0.08)]
        backdrop-blur
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
