import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

const Balance = () => {
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  const fetchBalance = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/account/balance`, {
        withCredentials: true,
      });
      setBalance(response.data.balance);
    } catch (err) {
      console.error("Fetch balance failed:", err);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-full">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Available Balance</h3>
          <p className="text-3xl font-bold text-gray-900">₹{Math.round(balance).toLocaleString()}</p>
        </div>
      </div>
      <div className="mt-4 md:mt-0">
        <Button
          onClick={() => navigate("/addbalance")}
          label="Add Money"
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
        />
      </div>
    </div>
  );
};

export default Balance;
