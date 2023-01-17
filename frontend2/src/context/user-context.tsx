import React, { createContext, useContext, useState } from "react";

export interface IUser {
  firstName: string;
  lastName?: string;
  email: string;
  currency: string;
  accessToken?: string;
  createdAt?: Date;
}

interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const getCurrency = () => {
  const { user } = useContext(UserContext);
  return user?.currency;
};

export default UserContextProvider;
