import User from "../components/Users";
import Balance from "../components/Balance";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Dashboard = () => {
  const navigate = useNavigate();
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentTransactions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/account/transactions`, {
          params: { page: 1, limit: 3 },
          withCredentials: true,
        });
        setRecentTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Welcome to PaySwift</h1>
            <p className="text-blue-100">Your secure digital wallet for seamless transactions</p>
          </div>

          {/* Balance Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <Balance />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => navigate("/addbalance")}
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-200 flex items-center space-x-4"
            >
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Add Money</h3>
                <p className="text-sm text-gray-500">Top up your wallet</p>
              </div>
            </button>

            <button
              onClick={() => navigate("/autopay")}
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-200 flex items-center space-x-4"
            >
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">AutoPay</h3>
                <p className="text-sm text-gray-500">Schedule payments</p>
              </div>
            </button>

            <button
              onClick={() => navigate("/history")}
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-200 flex items-center space-x-4"
            >
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">History</h3>
                <p className="text-sm text-gray-500">View transactions</p>
              </div>
            </button>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Recent Transactions</h2>
              <button
                onClick={() => navigate("/history")}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View All
              </button>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : recentTransactions.length > 0 ? (
              <div className="space-y-4">
                {recentTransactions.map((txn) => (
                  <div
                    key={txn._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${
                        txn.status === "success" ? "bg-green-100" : "bg-red-100"
                      }`}>
                        <svg className={`w-6 h-6 ${
                          txn.status === "success" ? "text-green-600" : "text-red-600"
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {txn.senderName === "You" ? txn.receiverName : txn.senderName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(txn.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        txn.senderName === "You" ? "text-red-600" : "text-green-600"
                      }`}>
                        {txn.senderName === "You" ? "-" : "+"}₹{txn.amount}
                      </p>
                      <p className="text-sm text-gray-500 capitalize">{txn.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-gray-500">No recent transactions</p>
              </div>
            )}
          </div>

          {/* Quick Transfer Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Transfer</h2>
            <User />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;