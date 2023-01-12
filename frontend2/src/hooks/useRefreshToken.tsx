import axios from "axios";
import { IUser } from "../context/user-context";

const useRefreshToken = () => {
  const refresh = async () => {
    const response = await axios.post<IUser>("/api/refresh", {
      withCredentials: true,
    });

    const loggedUser = response.data;
    return loggedUser;
  };

  return refresh;
};

export default useRefreshToken;
