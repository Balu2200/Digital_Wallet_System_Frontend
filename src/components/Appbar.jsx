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
    <div className="shadow-xl h-16 flex justify-between items-center rounded-lg bg-cyan-500 px-6">
      {/* Logo */}
      <div className="flex bg-indigo-600 items-center text-2xl font-bold text-white p-2 shadow-lg rounded-lg">
        PaySwift
      </div>

      <div className="flex items-center space-x-6">
        <button
          onClick={() => navigate("/autopay")}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-all"
        >
          Autopay
        </button>
        <button
          onClick={() => navigate("/help")}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-all"
        >
          💁‍♂️Help
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-all"
        >
          Dashboard
        </button>

        <button
          onClick={goToTransactions}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded transition-all"
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
                className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded transition-all"
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
