import axios from "axios";
import { setAccessToken } from "../utils/accessToken";

export async function generateAccessToken() {
  try {
    const { data: newAccessToken } = await axios.post("/api/refresh");
    setAccessToken(newAccessToken);
  } catch (error) {
    return error;
  }
}
