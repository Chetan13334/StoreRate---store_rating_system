const ErrorMessage = ({ message }) => {
  return (
    <div className="rounded-lg bg-red-100 p-4 text-red-700">
      {message}
    </div>
  );
};

export default ErrorMessage;