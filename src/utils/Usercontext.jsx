import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const UserContext = createContext({
  user: null,
  addUser: () => {},
  removeUser: () => {},
});

export const UserContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/profile/me`, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      } finally {
        setLoading(false); 
      }
    };

    fetchUser();
  }, []);

  const addUser = (userData) => {
    setUser(userData);
  };

  const removeUser = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true }); 
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, addUser, removeUser }}>
      {!loading ? children : <div>Loading...</div>}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  return useContext(UserContext);
};
