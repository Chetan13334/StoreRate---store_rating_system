import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">

      <h1 className="text-8xl font-bold">
        404
      </h1>

      <p className="my-6 text-xl">
        Page Not Found
      </p>

      <Link
        to="/"
        className="rounded bg-blue-600 px-6 py-3 text-white"
      >
        Go Home
      </Link>

    </div>
  );
};

export default NotFound;