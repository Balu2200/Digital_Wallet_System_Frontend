import Headingtitle from "../components/Headingtitle";
import { Button } from "../components/Button";
import InputBox from "../components/InputBox";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";

const AddBalance = () => {
  const [amount, setAmount] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNextStep = () => {
    const transferAmount = Number(amount);

    if (!amount || isNaN(transferAmount) || transferAmount <= 0) {
      setStatusMessage("Please enter a valid amount greater than 0.");
      setMessageType("error");
      return;
    }

    setStep(2);
    setStatusMessage("");
  };

  const handleAddBalance = async () => {
    if (!/^\d{4,6}$/.test(pin)) {
      setStatusMessage("Invalid PIN. Must be 4-6 digits.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    try {
      await axios.put(
        `${BASE_URL}/account/update`,
        { amount: Number(amount), pin },
        { withCredentials: true }
      );

      setStatusMessage("Balance updated successfully!");
      setMessageType("success");
      setAmount("");
      setPin("");
      setStep(1);
    } catch (err) {
      console.error("Balance update failed:", err);

      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Balance not updated! Please try again.";
      setStatusMessage(errorMessage);
      setMessageType("error");
    } finally {
      setLoading(false);
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
                  label={loading ? "Processing..." : "Confirm"}
                  variant="primary"
                  fullWidth={true}
                  disabled={loading}
                />
              </>
            )}

            {statusMessage && (
              <ErrorAlert
                message={statusMessage}
                type={messageType}
                onClose={() => setStatusMessage("")}
              />
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
