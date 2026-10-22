import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center">
        <p className="text-sm font-medium text-[#C99732] mb-3">ERROR 404</p>

        <h1 className="text-7xl md:text-9xl font-bold text-[#0C0C0C]">404</h1>

        <h2 className="mt-4 text-2xl md:text-3xl font-semibold">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-500 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-[#0C0C0C] text-white px-7 py-3
                     text-sm hover:bg-black/80 transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
