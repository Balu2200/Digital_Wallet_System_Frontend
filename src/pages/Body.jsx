import Appbar from "../components/Appbar";
import FloatingChatbot from "../components/FloatingChatbot";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../utils/Usercontext";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useEffect } from "react";

const Body = () => {
  const { user, addUser } = useUser();
  const navigate = useNavigate();

  const fetchUser = async () => {
    if (user) return;

    try {
      const response = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      addUser(response.data.user);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

  return (
    <div>
      <Appbar />
      <Outlet />
      <FloatingChatbot />
    </div>
  );
};

export default Body;
