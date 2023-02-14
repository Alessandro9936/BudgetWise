import axios from "axios";
import { UserProps } from "@/types/userType";

const useRefreshToken = () => {
  const refresh = async () => {
    const response = await axios.post<UserProps>(
      "https://budgetwise-api.up.railway.app/api/refresh"
    );

    const loggedUser = response.data;
    return loggedUser;
  };

  return refresh;
};

export default useRefreshToken;
