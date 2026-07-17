const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        rounded-xl
        bg-white
        p-6
        shadow-md
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;