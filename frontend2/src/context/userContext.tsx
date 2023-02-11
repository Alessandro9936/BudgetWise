import React, { createContext, useContext, useState } from "react";
import { UserProps } from "@/types/userType";

type UserContext = {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
};

export const UserContext = createContext<UserContext>({} as UserContext);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const getCurrency = () => {
  const { user } = useContext(UserContext);

  if (user) {
    return user.currency;
  }
};

export default UserContextProvider;
