import User from "../components/Users";
import Balance from "../components/Balance";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-7xl mx-auto px-6 py-8 mt-28">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-card p-8 text-white shadow-medium">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome to PayVault</h1>
                <p className="text-primary-100">
                  Your secure digital wallet for seamless transactions
                </p>
              </div>
              <button
                onClick={() => navigate("/analytics")}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 border border-white/30"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                View Analytics
              </button>
            </div>
          </div>

          {/* Balance Section */}
          <div className="card p-6">
            <Balance />
          </div>

          {/* Quick Transfer Section */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">
              Quick Transfer
            </h2>
            <User />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
