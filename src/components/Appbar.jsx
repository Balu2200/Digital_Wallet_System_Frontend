import { useUser } from "../utils/Usercontext";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const { user, removeUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (user) {
      removeUser();
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const goToTransactions = () => {
    navigate("/history"); 
  };

  return (
    <div className="shadow-xl h-16 flex justify-between items-center rounded-lg bg-cyan-500 px-6">
      <div className="flex bg-indigo-600 items-center text-2xl font-bold text-black p-2 shadow-lg rounded-lg">
        PaySwift
      </div>

      <div className="flex items-center space-x-6">
      
        <Button onClick={() => navigate("/dashboard")} label={"Dashboard"} />
        <Button onClick={goToTransactions} label={"History"} />
        <div className="flex items-center space-x-4">
          {user === null ? (
            <span className="text-white">Loading...</span>
          ) : (
            <>
              {user && (
                <h1 className="font-semibold text-white">
                  Welcome, {user.firstName}
                </h1>
              )}
              <Button
                onClick={handleLogout}
                label={user ? "Logout" : "Login"}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appbar;
