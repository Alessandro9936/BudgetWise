import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { setAccessToken } from "../utils/accessToken";

export const useRefreshToken = () => {
  const { setUser } = useContext(UserContext);

  const refresh = async () => {
    const response = await axios.post("/api/refresh", {
      withCredentials: true,
    });

    //setUser((prev) => ({ ...prev, accessToken: response.data }));
    setAccessToken(response.data);
    return response.data;
  };

  return refresh;
};
