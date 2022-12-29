import axios from "axios";
import { setAccessToken } from "../services/accessTokenHandler";

const useRefreshToken = () => {
  const refresh = async () => {
    const response = await axios.post("/api/refresh", {
      withCredentials: true,
    });

    const { data: accessToken }: { data: string } = response;

    setAccessToken(accessToken);
    return accessToken;
  };

  return refresh;
};

export default useRefreshToken;
