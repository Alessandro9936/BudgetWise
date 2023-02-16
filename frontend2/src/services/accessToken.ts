let accessToken = "";

export const setAccessToken = (newAccessToken: string) =>
  (accessToken = newAccessToken);
export const getAccessToken = () => accessToken;
