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
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-4xl mt-28">
        <div className="card p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-secondary-900 mb-2">
              Transaction History
            </h2>
            <p className="text-secondary-500">
              A record of your recent transactions.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-secondary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <p className="text-secondary-500">No transactions found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b border-secondary-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-600 uppercase">
                      Receiver
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-600 uppercase">
                      Sender
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-600 uppercase">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-600 uppercase">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-600 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-100">
                  {transactions.map((txn) => (
                    <tr key={txn._id} className="hover:bg-secondary-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-600 font-semibold text-sm">
                            {txn.receiverName
                              ? txn.receiverName[0].toUpperCase()
                              : "?"}
                          </span>
                          <span className="font-medium text-secondary-900">
                            {txn.receiverName}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent-100 text-accent-600 font-semibold text-sm">
                            {txn.senderName
                              ? txn.senderName[0].toUpperCase()
                              : "?"}
                          </span>
                          <span className="font-medium text-secondary-900">
                            {txn.senderName}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-secondary-600 text-sm">
                        {new Date(txn.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 font-semibold text-secondary-900">
                        ₹{txn.amount}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={
                            txn.status === "success"
                              ? "badge-success"
                              : "badge-error"
                          }
                        >
                          {txn.status.charAt(0).toUpperCase() +
                            txn.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Prev
            </button>
            <span className="text-sm font-medium text-secondary-700">
              Page {page}
            </span>
            <button onClick={() => setPage(page + 1)} className="btn-secondary">
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
