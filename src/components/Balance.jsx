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
    <div className="flex justify-center mt-6">
      <div className="flex items-center gap-6 bg-gradient-to-r from-white to-gray-100 shadow-md px-8 py-4 rounded-2xl border border-gray-300">
        <div className="p-2 text-xl font-semibold text-gray-900">
          💰 Current Balance:
          <span className="text-blue-600 ml-2">Rs.{Math.round(balance)}</span>
        </div>
        <div className="px-1 pb-1">
          <Button
            onClick={() => navigate("/addbalance")}
            label={"➕ Add Balance"}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-5 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
};

export default Balance;
