import { useState } from "react";
import Bottomwarning from "../components/Bottomwarning";
import { Button } from "../components/Button";
import Headingtitle from "../components/Headingtitle";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../utils/Usercontext";

const Login = () => {
  const navigate = useNavigate();
  const { addUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(""); 
  const [statusMessage, setStatusMessage] = useState("");
  const [step, setStep] = useState(1); 
  const [userId, setUserId] = useState(null); 
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (event) => {
    if (event) event.preventDefault();
    setStatusMessage("");
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      navigate("/otp", { state: { userId: response.data.userId } });
    } catch (error) {
      setStatusMessage(
        error.response?.data?.error || "Login failed. Try again."
      );
    }
  };

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
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      setStatusMessage(
        error.response?.data?.error || "Invalid OTP. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-blue-300 flex items-center justify-center py-4 px-2 sm:py-8 sm:px-0">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl px-4 py-6 sm:px-8 sm:py-10 flex flex-col items-center">
          <div className="mb-6 w-full text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-2 tracking-tight">Sign in to PaySwift</h1>
            <p className="text-gray-500 text-sm sm:text-base">Welcome back! Please enter your details to continue.</p>
          </div>

          <form className="w-full space-y-5 sm:space-y-6" onSubmit={handleLogin}>
            {step === 1 ? (
              <>
                <InputBox
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@gmail.com"
                  label="Email"
                  value={email}
                />
                <InputBox
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  toggleVisibility={() => setShowPassword((prev) => !prev)}
                />
                <Button
                  type="submit"
                  label="Sign In"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 text-base sm:text-lg"
                />
              </>
            ) : (
              <>
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
              </>
            )}
          </form>

          {statusMessage && (
            <div className="mt-4 text-sm font-medium px-2 py-2 rounded-lg w-full text-center sm:px-4"
              style={{ color: statusMessage.includes('success') ? '#166534' : '#1e40af', background: statusMessage.includes('success') ? '#bbf7d0' : '#dbeafe' }}>
              {statusMessage}
            </div>
          )}

          <div className="pt-4 sm:pt-6 w-full flex justify-center">
            <Bottomwarning
              label="Don't have an account?"
              buttonText="Signup"
              to="/signup"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
