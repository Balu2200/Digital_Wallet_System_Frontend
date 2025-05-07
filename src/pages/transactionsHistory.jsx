import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/account/transactions`, {
          params: { page, limit },
          withCredentials: true,
        });
        setTransactions(response.data.transactions);  
      } catch (err) {
        setError("Failed to fetch transactions");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [page]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-6 px-2 sm:py-10 sm:px-0">
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl px-4 py-6 sm:px-8 sm:py-10">
          <div className="mb-6 w-full text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-2 tracking-tight">Transaction History</h2>
            <p className="text-gray-500 text-sm sm:text-base">A record of your recent transactions.</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-gray-500">No transactions found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receiver</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (Rs.)</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((txn) => (
                    <tr key={txn._id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap align-top">
                        <div className="inline-block align-top">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold align-top">
                            {txn.receiverName ? txn.receiverName[0] : "?"}
                          </span>
                        </div>
                        <span className="ml-2 font-medium text-gray-900 align-top inline-block align-top">{txn.receiverName}</span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap align-top">
                        <div className="inline-block align-top">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold align-top">
                            {txn.senderName ? txn.senderName[0] : "?"}
                          </span>
                        </div>
                        <span className="ml-2 font-medium text-gray-900 align-top inline-block align-top">{txn.senderName}</span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap align-top text-gray-700">
                        {new Date(txn.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap align-top font-semibold text-gray-900">
                        ₹{txn.amount}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap align-top">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          txn.status === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center items-center mt-6 gap-2 sm:gap-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-5 py-2 bg-blue-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:bg-blue-600 transition-all"
            >
              Prev
            </button>
            <span className="mx-2 text-base font-semibold">Page {page}</span>
            <button
              onClick={() => setPage(page + 1)}
              className="px-5 py-2 bg-blue-500 text-white rounded-lg font-medium shadow-md hover:bg-blue-600 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
