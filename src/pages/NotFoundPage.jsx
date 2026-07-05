import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      
      <h1 className="text-6xl font-bold text-gray-800">404</h1>

      <p className="text-gray-500 mt-3 text-lg">
        Page not found
      </p>

      <p className="text-gray-400 text-sm mt-2">
        The route you entered doesn't exist
      </p>

      <button
        onClick={() => navigate("/admin")}
        className="mt-6 px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Go to Admin
      </button>
    </div>
  );
}