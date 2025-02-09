import { useUser } from "../utils/Usercontext";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const { user, removeUser } = useUser();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (user) {
      removeUser();
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="shadow-xl h-16 flex justify-between rounded-lg bg-cyan-300">
      <div className="flex flex-col justify-center h-full mr-4 font-bold mx-2 p-2">
        PayTM App
      </div>
      <div className="flex items-center p-3 space-x-4">
        {user === null ? (
          <span>Loading...</span> 
        ) : (
          <>
            {user && <h1 className="font-semibold">{user.firstName}</h1>}
            <Button
              onClick={handleButtonClick}
              label={user ? "Logout" : "Login"}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Appbar;
