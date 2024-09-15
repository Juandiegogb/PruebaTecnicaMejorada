import { createContext, useState, useContext } from "react";

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [name, setName] = useState(null);
  const [id, setId] = useState(null);
  const value = { name, setName, id, setId };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
