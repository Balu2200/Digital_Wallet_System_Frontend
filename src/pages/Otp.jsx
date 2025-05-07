import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import InputBox from "../components/InputBox";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useUser } from "../utils/Usercontext";

const Otp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addUser } = useUser();
  const userId = location.state?.userId;

  const [otp, setOtp] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  if (!userId) {
    // If userId is not present, redirect to login
    navigate("/login");
    return null;
  }

  const handleVerifyOtp = async () => {
    setStatusMessage("");
    try {
      const response = await axios.post(
        BASE_URL + "/verify-otp",
        { userId, otp },
        { withCredentials: true }
      );
      addUser(response.data.user);
      setStatusMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (error) {
      setStatusMessage(
        error.response?.data?.error || "Invalid OTP. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-blue-300 flex items-center justify-center py-8">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center">
          <div className="mb-6 w-full text-center">
            <h1 className="text-3xl font-extrabold text-blue-700 mb-2 tracking-tight">Enter OTP</h1>
            <p className="text-gray-500 text-base">Please enter the OTP sent to your email to continue.</p>
          </div>
          <form className="w-full space-y-6" onSubmit={e => { e.preventDefault(); handleVerifyOtp(); }}>
            <InputBox
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              label="OTP"
              value={otp}
            />
            <Button
              onClick={handleVerifyOtp}
              label="Verify OTP"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
            />
          </form>
          {statusMessage && (
            <div className="mt-4 text-sm font-medium px-4 py-2 rounded-lg w-full text-center "
              style={{ color: statusMessage.includes('success') ? '#166534' : '#1e40af', background: statusMessage.includes('success') ? '#bbf7d0' : '#dbeafe' }}>
              {statusMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Otp; 