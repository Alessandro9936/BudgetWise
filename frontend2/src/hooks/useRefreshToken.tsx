import axios from "axios";
import { UserProps } from "@/types/userType";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

const useRefreshToken = () => {
  const { setUser } = useContext(UserContext);
  const refresh = async () => {
    const response = await axios.post<UserProps>(
      "https://budgetwise-api.up.railway.app/api/refresh",
      {},
      { withCredentials: true }
    );

    setUser(response.data);
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
