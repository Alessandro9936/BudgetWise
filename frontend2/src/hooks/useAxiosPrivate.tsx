import axios, { AxiosError } from "axios";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/userContext";
import useRefreshToken from "./useRefreshToken";

const axiosPrivate = axios.create({
  baseURL: "https://budgetwise-api.up.railway.app",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const useAxiosPrivate = () => {
  const { user } = useContext(UserContext);
  const refresh = useRefreshToken();

  useEffect(() => {
    /*
      Right after the user login the generated access token will not be automatically
      attached to the header. This request interceptor handle the attachment of the
      access token to the header on first call after login
      */
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (config.headers && !config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    /*
      Access tokens have a short life span (10 mins), this allows to limit the time
      an attacker can abuse a stolen token. This also means that at a certain point, when 
      the user is navigating, the token could be expired on the next call. This interceptor
      attached on the response allow to handle in the background the case where the access token
      is expired and generate a new one if the refresh token is still valid.
      */
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const prevRequest = error.config;
        let isSent = false;
        if (prevRequest?.headers && error.response?.status === 401 && !isSent) {
          /* isSent variable allow to retry to get an accessToken only once, if the
          first call returns an error it means that also the refrsh token has expired */
          isSent = true;
          const accessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [user, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
