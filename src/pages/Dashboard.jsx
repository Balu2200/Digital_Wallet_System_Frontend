import Appbar from "../components/Appbar";
import User from "../components/Users";
import Balance from "../components/Balance";

const Dashboard= () => {
  return (
    <div>
      <Appbar/>
      <div>
        <Balance value={"10,1000"}/>
        <User/>
      </div>
    </div>
  )
}

export default Dashboard;