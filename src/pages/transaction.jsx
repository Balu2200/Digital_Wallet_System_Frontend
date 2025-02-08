import Headingtitle from "../components/Headingtitle";
import { Button } from "../components/Button";
import InputBox from "../components/InputBox";

const transaction = () => {
  return (
    <div className="bg-slate-400 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-xl bg-white w-80 text-center p-2 h-max px-4 shadow-2xl">
          <Headingtitle label={"Send Money"} />
          <div>
            <div className="flex gap-3 pt-2 mb-3">
              <h1>🧒</h1>
              <span className="font-medium">Balu Pasumarthi</span>
            </div>
            <div>
              <InputBox placeholder={"Enter amount"} label={"Amount"} />
            </div>
            <div className="pt-2 pb-4">
              <Button label={"TranserMoney"}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default transaction