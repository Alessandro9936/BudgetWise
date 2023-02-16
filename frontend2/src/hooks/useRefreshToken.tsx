import axios from "axios";
import { UserProps } from "@/types/userType";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { setAccessToken } from "@/services/accessToken";

const useRefreshToken = () => {
  const { setUser } = useContext(UserContext);
  const refresh = async () => {
    const response = await axios.get<UserProps & { accessToken: string }>(
      "https://budgetwise-api.up.railway.app/api/refresh",
      {
        withCredentials: true,
      }
    );

    setUser(response.data);
    setAccessToken(response.data.accessToken);
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
