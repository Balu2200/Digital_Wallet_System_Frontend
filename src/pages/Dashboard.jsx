import Appbar from "../components/Appbar";
import User from "../components/Users";
import Balance from "../components/Balance";

const Dashboard= () => {
  return (
    <div className="bg-green-100">
      <div>
        <div className="bg-cyan-100 py-1 ">
          <Balance/>
        </div>
        <User />
      </div>
    </div>
  );
}

export default Dashboard;