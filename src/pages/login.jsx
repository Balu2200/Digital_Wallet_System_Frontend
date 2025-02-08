import Bottomwarning from "../components/Bottomwarning";
import { Button } from "../components/Button";
import Headingtitle from "../components/Headingtitle";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

const login = () => {
  return (
    <div className="bg-slate-400 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-xl bg-white w-80 text-center p-2 h-max px-4 shadow-2xl">
          <Headingtitle label={"Login"} />
          <SubHeading label={"Please Enter your details"} />
          <InputBox placeholder="email@gmail.com" label={"Email"} />
          <InputBox placeholder="123123" label={"Password"} />
          <div>
            <Button label={"Submit"} />
          </div>
          <div className="p-2 flex">
            <Bottomwarning label={"Don't have account?"} buttonText={"Signup"} to={"/signup"}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
