import { useState } from "react";
import Bottomwarning from "../components/Bottomwarning";
import { Button } from "../components/Button";
import Headingtitle from "../components/Headingtitle";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const login = () => { 

  const navigate = useNavigate();

  const[email, setEmail] = useState('');
  const[password, setPassword]= useState("");

  return (
    <div className="bg-slate-400 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-xl bg-white w-80 text-center p-2 h-max px-4 shadow-2xl">
          <Headingtitle label={"Login"} />
          <SubHeading label={"Please Enter your details"} />
          <InputBox
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="email@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="123123"
            label={"Password"}
          />
          <div>
            <Button onClick ={() =>{
              axios.post(
                BASE_URL + "/login",
                {
                  email,
                  password,
                },
                { withCredentials: true }
              );
              navigate("/dashboard")
            } }label={"Submit"} />
          </div>
          <div className="p-2 flex">
            <Bottomwarning
              label={"Don't have account?"}
              buttonText={"Signup"}
              to={"/signup"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
