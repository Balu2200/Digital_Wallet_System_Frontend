// components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useUser } from "../utils/Usercontext";

const PrivateRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
