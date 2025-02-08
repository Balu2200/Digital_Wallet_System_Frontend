import Appbar from "../components/Appbar";
import User from "../components/Users";
import Balance from "../components/Balance";

const Dashboard= () => {
  return (
    <div className="bg-green-100">
      <Appbar />
      <div>
        <div className="bg-cyan-100 py-1 ">
          <Balance value={"10,000"} />
        </div>
        <User />
      </div>
    </div>
  );
}

export default Dashboard;