import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "./ErrorAlert";

const Balance = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchBalance = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`${BASE_URL}/account/balance`, {
        withCredentials: true,
      });
      setBalance(response.data.balance);
    } catch (err) {
      console.error("Fetch balance failed:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to fetch balance. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  if (error) {
    return (
      <div className="space-y-4">
        <ErrorAlert message={error} type="error" onClose={() => setError("")} />
        <button
          onClick={fetchBalance}
          className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-4">
        <div className="bg-primary-600 p-4 rounded-xl">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-medium text-secondary-500 mb-1">
            Available Balance
          </h3>
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary-600 border-t-transparent"></div>
              <span className="text-sm text-secondary-500">Loading...</span>
            </div>
          ) : (
            <p className="text-3xl font-bold text-secondary-900">
              ₹{Math.round(balance).toLocaleString()}
            </p>
          )}
        </div>
      </div>
      <div>
        <Button
          onClick={() => navigate("/addbalance")}
          label="Add Money"
          variant="accent"
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default Balance;
