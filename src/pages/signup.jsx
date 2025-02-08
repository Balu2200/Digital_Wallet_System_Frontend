import { useState } from "react";
import axios from "axios";
import Bottomwarning from "../components/Bottomwarning";
import { Button } from "../components/Button";
import Headingtitle from "../components/Headingtitle";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { BASE_URL } from "../utils/constants";

const signup = () => {

  const[firstName, setfirstName] = useState('');
  const[lastName, setlastName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  return (
    <div className="bg-slate-400 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 shadow-2xl">
          <Headingtitle label={"Signup"} />
          <SubHeading label={"Please Enter your details"} />
          <InputBox
            onChange={(e) => {
              setfirstName(e.target.value);
            }}
            placeholder="Balu"
            label={"FirstName"}
          />
          <InputBox
            onChange={(e) => {
              setlastName(e.target.value);
            }}
            placeholder="pasumarthi"
            label={"LastName"}
          />
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
            <Button onClick={() =>{axios.post(BASE_URL+"/signup",{
              firstName,
              lastName,
              email,
              password
            })}} label={"Submit"} />
          </div>
          <div className="p-2 flex">
            <Bottomwarning
              label={"Already have account?"}
              buttonText={"Login"}
              to={"/login"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default signup;