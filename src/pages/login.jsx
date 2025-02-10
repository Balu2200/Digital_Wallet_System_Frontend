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

  const handleLogin = async () => {
    setStatusMessage("");
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );

    
      setUserId(response.data.userId);
      setStatusMessage("OTP sent to your email. Please verify.");
      setStep(2); 
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
    <div className="bg-slate-400 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-xl bg-white w-80 text-center p-2 h-max px-4 shadow-2xl">
          <Headingtitle label="Login" />
          <SubHeading label="Please enter your details" />

          {step === 1 ? (
            <>
              <InputBox
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@gmail.com"
                label="Email"
              />
              <InputBox
                onChange={(e) => setPassword(e.target.value)}
                placeholder="123123"
                label="Password"
                type="password"
              />
              <Button onClick={handleLogin} label="Submit" />
            </>
          ) : (
            <>
              <InputBox
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                label="OTP"
              />
              <Button onClick={handleVerifyOtp} label="Verify OTP" />
            </>
          )}

          {statusMessage && (
            <div className="mt-2 text-sm font-medium text-indigo-500">
              {statusMessage}
            </div>
          )}

          <div className="p-2 flex">
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
