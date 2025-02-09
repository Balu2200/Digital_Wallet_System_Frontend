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
    <div className="flex justify-center">
      <div className="flex gap-6 text-center">
        <div className="p-2 font-medium">
          Current Balance: Rs.{Math.round(balance)}
        </div>
        <div className="px-1 pb-1">
          <Button
            onClick={() => navigate("/addbalance")}
            label={"Add Balance"}
          />
        </div>
      </div>
    </div>
  );
};

export default Balance;
