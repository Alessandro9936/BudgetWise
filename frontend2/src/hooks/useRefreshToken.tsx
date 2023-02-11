import axios from "axios";
import { UserProps } from "@/types/userType";

const useRefreshToken = () => {
  const refresh = async () => {
    const response = await axios.post<UserProps>("/api/refresh", {
      withCredentials: true,
    });

    const loggedUser = response.data;
    return loggedUser;
  };

  return refresh;
};

export default useRefreshToken;
