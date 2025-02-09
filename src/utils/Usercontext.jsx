import { createContext, useContext, useState } from "react";


const UserContext = createContext({
  user: null,
  addUser: () => {},
  removeUser: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const addUser = (userData) => {
    setUser(userData);
  };

  const removeUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, addUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
