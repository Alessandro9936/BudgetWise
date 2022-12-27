import { axiosPrivate } from "../api/axios";
import { useRefreshToken } from "./useRefreshToken";
import { useEffect } from "react";
import { getAccessToken } from "../utils/accessToken";

/*
This custom hook has the main joob to return the axiosPrivate instance and it
will have the interceptors added to handle the jwt tokens that we need to request our data
and eventually retry and get a new access token if neccesary. It will be attached on 
each call to a protected route of the API. This help to avoid costant reauthentication 
until the refresh token is active
*/
export const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const accessToken = getAccessToken();

  useEffect(() => {
    /*
      Right after the user login the generated access token will not be automatically
      attached to the header. This request interceptor handle the attachment of the
      access token to the header on first call after login
      */
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    /*
      Access tokens have a short life span (10 mins), this allows to limit the time
      an attacker can abuse a stolen token. This also means that at a certain point, when 
      the user is navigating, the token could be expired on the next call. This interceptor
      attached on the response allow to handle on the background the case when the access token
      is expired and generate a new one. The response return an authentication error, a new 
      access token is generated and attached to the header, the previous request runs again with new token.
      If also on this request the response will contain an error it means the refresh token has
      expired, redirect to login.
      */
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      // accessToken has expired
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          // create private property on prevRequest to avoid a possible endless loop
          // of 401, we want to only retry once
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [accessToken, refresh]);

  return axiosPrivate;
};
