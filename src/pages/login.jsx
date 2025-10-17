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
import ErrorAlert from "../components/ErrorAlert";

const Login = () => {
  const navigate = useNavigate();
  const { addUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    if (event) event.preventDefault();
    setStatusMessage("");
    setLoading(true);
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      navigate("/otp", { state: { userId: response.data.userId } });
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      setStatusMessage(errorMessage);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setStatusMessage("");
    setLoading(true);
    try {
      const response = await axios.post(
        BASE_URL + "/verify-otp",
        { userId, otp },
        { withCredentials: true }
      );
      addUser(response.data.user);
      setStatusMessage("Login successful! Redirecting...");
      setMessageType("success");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Invalid OTP. Please try again.";
      setStatusMessage(errorMessage);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-blue-300 flex items-center justify-center py-4 px-2 sm:py-8 sm:px-0">
      <div className="w-full max-w-md mx-auto mt-28">
        <div className="bg-white rounded-2xl shadow-2xl px-4 py-6 sm:px-8 sm:py-10 flex flex-col items-center">
          <div className="mb-6 w-full text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-2 tracking-tight">
              Sign in to PayVault
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Welcome back! Please enter your details to continue.
            </p>
          </div>

          <form
            className="w-full space-y-5 sm:space-y-6"
            onSubmit={handleLogin}
          >
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
                  label={loading ? "Signing In..." : "Sign In"}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 text-base sm:text-lg"
                  disabled={loading}
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
                  label={loading ? "Verifying..." : "Verify OTP"}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
                  disabled={loading}
                />
              </>
            )}
          </form>

          {statusMessage && (
            <div className="mt-4 w-full">
              <ErrorAlert
                message={statusMessage}
                type={messageType}
                onClose={() => setStatusMessage("")}
              />
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
