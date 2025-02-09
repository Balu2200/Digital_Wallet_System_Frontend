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
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold text-center mb-4">
        Transaction History
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Receiver</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Amount (Rs.)</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn._id} className="text-center">
                <td className="border p-2">{txn.receiverName}</td>
                <td className="border p-2">
                  {new Date(txn.timestamp).toLocaleDateString()}
                </td>
                <td className="border p-2">{txn.amount}</td>
                <td
                  className={`border p-2 ${
                    txn.status === "success" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="mx-4">Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionHistory;
