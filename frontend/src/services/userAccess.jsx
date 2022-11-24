import axios from "axios";
import { useMutation } from "react-query";

const userAction = ({ userData, endpoint }) => {
  return axios.post(`/api/${endpoint}`, userData);
};

export function userActionHandler() {
  return useMutation(userAction);
}
