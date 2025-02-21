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
  const [pin, setPin] = useState("");
  const [transferAmount, setTransferAmount] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [step, setStep] = useState(1);

  const handleNextBtn = () => {
    const amountValue = Number(amount);

    if (!amount || isNaN(amountValue) || amountValue <= 0) {
      setStatusMessage({ text: "Please enter a valid amount.", type: "error" });
      return;
    }

    setTransferAmount(amountValue);
    setStep(2);
    setStatusMessage(null);
  };

  const handleTransfer = async () => {
    if (!/^\d{4,6}$/.test(pin)) {
      setStatusMessage({
        text: "Invalid PIN. Must be 4-6 digits.",
        type: "error",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/account/transfer`,
        { to: id, amount: transferAmount, pin },
        { withCredentials: true }
      );

      setStatusMessage({ text: "Transfer Successful!", type: "success" });
      setAmount("");
      setPin("");
      setStep(1);
    } catch (error) {
      setStatusMessage({
        text:
          "Transfer Failed: " +
          (error.response?.data?.message || error.message),
        type: "error",
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-2xl bg-white w-96 text-center p-6 shadow-2xl">
          <Headingtitle label={"Send Money"} />

          {step === 1 && (
            <div>
              <div className="flex gap-3 pt-4 mb-4 items-center">
                <h1 className="bg-green-500 text-white font-bold text-xl rounded-full p-3 w-14 h-14 flex items-center justify-center">
                  {toname ? toname[0].toUpperCase() : "?"}
                </h1>
                <span className="font-semibold text-lg">
                  {toname || "Unknown"}
                </span>
              </div>
              <InputBox
                placeholder={"Enter amount"}
                label={"Amount (in Rs.)"}
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="pt-4 pb-6">
                <Button
                  onClick={handleNextBtn}
                  label={"Next"}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <InputBox
                placeholder={"Enter your pin"}
                label={"Enter your PIN"}
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
              <div className="pt-4 pb-6">
                <Button
                  onClick={handleTransfer}
                  label={"Transfer Money"}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {statusMessage && (
            <div
              className={`mt-4 p-3 rounded-md text-sm font-medium ${
                statusMessage.type === "success"
                  ? "text-green-800 bg-green-200"
                  : "text-red-800 bg-red-200"
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
