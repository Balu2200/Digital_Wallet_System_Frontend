import Headingtitle from "../components/Headingtitle";
import { Button } from "../components/Button";
import InputBox from "../components/InputBox";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBalance = () => {
  const [amount, setAmount] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleNextStep = () => {
    const transferAmount = Number(amount);

    if (!amount || isNaN(transferAmount) || transferAmount <= 0) {
      setStatusMessage("Please enter a valid amount greater than 0.");
      setIsError(true);
      return;
    }

    setStep(2);
    setStatusMessage("");
  };

  const handleAddBalance = async () => {
    if (!/^\d{4,6}$/.test(pin)) {
      setStatusMessage("Invalid PIN. Must be 4-6 digits.");
      setIsError(true);
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/account/update`,
        { amount: Number(amount), pin },
        { withCredentials: true }
      );

      setStatusMessage("Balance updated successfully!");
      setIsError(false);
      setAmount("");
      setPin("");
      setStep(1);
    } catch (err) {
      console.error("Balance update failed:", err);

      setStatusMessage(
        err.response?.data?.error || "Balance not updated! Please try again."
      );
      setIsError(true);
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary-50 to-primary-100 min-h-screen flex justify-center items-center py-8 px-4">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <Headingtitle label={"Add Balance"} />

          <div className="space-y-6 pt-6">
            {step === 1 && (
              <>
                <div>
                  <InputBox
                    placeholder="Enter amount"
                    label="Amount (in Rs.)"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleNextStep}
                  label="Next"
                  variant="accent"
                  fullWidth={true}
                />
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <InputBox
                    placeholder="Enter your PIN"
                    label="Enter your PIN"
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleAddBalance}
                  label="Confirm"
                  variant="primary"
                  fullWidth={true}
                />
              </>
            )}

            {statusMessage && (
              <div
                className={`p-3 rounded-button text-sm font-medium ${
                  isError
                    ? "text-red-700 bg-red-50 border border-red-200"
                    : "text-accent-700 bg-accent-50 border border-accent-200"
                }`}
              >
                {statusMessage}
              </div>
            )}

            <div className="text-center">
              <button
                onClick={() => navigate("/dashboard")}
                className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                ← Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBalance;
