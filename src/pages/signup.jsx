import { useState } from "react";
import axios from "axios";
import Bottomwarning from "../components/Bottomwarning";
import { Button } from "../components/Button";
import Headingtitle from "../components/Headingtitle";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";

const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setStatusMessage("");
    setLoading(true);
    try {
      await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password, pin },
        { withCredentials: true }
      );
      setStatusMessage("Signup successful! Redirecting...");
      setMessageType("success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Signup failed. Please try again.";
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
              Create your PayVault Account
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Sign up to get started with secure digital payments.
            </p>
          </div>

          <form className="w-full space-y-5 sm:space-y-6">
            <InputBox
              onChange={(e) => setfirstName(e.target.value)}
              placeholder="Balu"
              label={"First Name"}
              value={firstName}
            />
            <InputBox
              onChange={(e) => setlastName(e.target.value)}
              placeholder="Pasumarthi"
              label={"Last Name"}
              value={lastName}
            />
            <InputBox
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@gmail.com"
              label={"Email"}
              value={email}
            />
            <InputBox
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              label={"Password"}
              type={showPassword ? "text" : "password"}
              value={password}
              toggleVisibility={() => setShowPassword((prev) => !prev)}
            />
            <InputBox
              onChange={(e) => setPin(e.target.value)}
              placeholder="4-6 digit PIN"
              label={"Account PIN"}
              value={pin}
              type="password"
            />
            <Button
              onClick={handleSignup}
              label={loading ? "Signing Up..." : "Sign Up"}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 text-base sm:text-lg"
              disabled={loading}
            />
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
              label={"Already have an account?"}
              buttonText={"Login"}
              to={"/login"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
