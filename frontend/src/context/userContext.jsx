import { createContext, useState } from "react";

export const UserContext = createContext({});

export default function UserProvider({ children }) {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

/*
const useUser = () => {
  const [user, setUser] = useContext(UserContext);

  if (user === undefined) {
    throw new Error("User is not provided");
  }

  return { user, setUser };
};

*/
