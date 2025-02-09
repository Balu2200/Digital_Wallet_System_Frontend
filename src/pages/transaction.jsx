import { useState } from "react";
import Headingtitle from "../components/Headingtitle";
import { Button } from "../components/Button";
import InputBox from "../components/InputBox";
import { useSearchParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Transaction = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const toname = searchParams.get("to");

  const [amount, setAmount] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);

  const handleTransfer = () => {
    const transferAmount = Number(amount);

    if (!amount || isNaN(transferAmount) || transferAmount <= 0) {
      alert("Please enter a valid amount greater than 0.");
      return;
    }

    axios
      .post(
        `${BASE_URL}/account/transfer`,
        { to: id, amount: transferAmount },
        { withCredentials: true }
      )
      .then((response) => {
        setStatusMessage({ text: "Transfer Successful!", type: "success" });
        setAmount(""); 
      })
      .catch((error) => {
        setStatusMessage({
          text:
            "Transfer Failed: " +
            (error.response?.data?.message || error.message),
          type: "error",
        });
        setAmount(""); 
      });
  };

  return (
    <div className="bg-slate-400 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-xl bg-white w-80 text-center p-2 h-max px-4 shadow-2xl">
          <Headingtitle label={"Send Money"} />
          <div>
            <div className="flex gap-3 pt-2 mb-3">
              <h1 className="bg-green-500 rounded-full p-1 w-10">
                {toname ? toname[0].toUpperCase() : "?"}
              </h1>
              <span className="font-medium">{toname || "Unknown"}</span>
            </div>
            <div>
              <InputBox
                placeholder={"Enter amount"}
                label={"Amount (in Rs.)"}
                type="number"
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="pt-2 pb-4">
              <Button onClick={handleTransfer} label={"Transfer Money"} />
            </div>
          </div>

         
          {statusMessage && (
            <div
              className={`mt-2 p-2 rounded-md text-sm font-medium ${
                statusMessage.type === "success"
                  ? "text-green-700 bg-green-100"
                  : "text-red-700 bg-red-100"
              }`}
            >
              {statusMessage.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
