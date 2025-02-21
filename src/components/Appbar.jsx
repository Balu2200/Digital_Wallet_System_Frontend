import { useUser } from "../utils/Usercontext";
import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const { user, removeUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (user) {
      removeUser();
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const goToTransactions = () => {
    navigate("/history");
  };

  return (
    <div className="shadow-xl h-16 flex justify-between items-center rounded-lg bg-gradient-to-r from-blue-700 to-indigo-900 px-6">
      {/* Logo */}
      <div className="flex bg-gradient-to-r from-indigo-500 to-purple-700 items-center text-2xl font-bold text-white p-2 shadow-lg rounded-lg">
        PaySwift
      </div>

      <div className="flex items-center space-x-6">
        <button
          onClick={() => navigate("/autopay")}
          className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-medium py-2 px-4 rounded transition-all"
        >
          Autopay
        </button>
        <button
          onClick={() => navigate("/help")}
          className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-medium py-2 px-4 rounded transition-all"
        >
          💁‍♂️Help
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gradient-to-r from-green-500 to-emerald-700 hover:from-green-600 hover:to-emerald-800 text-white font-medium py-2 px-4 rounded transition-all"
        >
          Dashboard
        </button>

        <button
          onClick={goToTransactions}
          className="bg-gradient-to-r from-indigo-500 to-blue-700 hover:from-indigo-600 hover:to-blue-800 text-white font-medium py-2 px-4 rounded transition-all"
        >
          History
        </button>

        <div className="flex items-center space-x-4">
          {user === null ? (
            <span className="text-white">Loading...</span>
          ) : (
            <>
              {user && (
                <h1 className="font-semibold text-white">
                  Welcome, {user.firstName}
                </h1>
              )}
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-white font-medium py-2 px-4 rounded transition-all"
              >
                {user ? "Logout" : "Login"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appbar;
