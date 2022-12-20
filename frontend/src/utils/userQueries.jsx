import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "./accessToken";

export function useUserFormActions(formState, setError, requestURL) {
  const { mutate } = useMutation((values) => axios.post(requestURL, values));

  const navigate = useNavigate();

  const signUpUser = (formData) => {
    mutate(formData, {
      onSuccess: (data) => {
        if (data.status === 201) {
          navigate("/login", { replace: true });
        }
      },
      onError: (error) => {
        const { param: field, msg: message } = error.response.data[0];
        setError(field, { message: message }, { shouldFocus: true });
        formState.isSubmitSuccessful(false);
      },
    });
  };

  const loginUser = (formData) => {
    mutate(formData, {
      onSuccess: (data) => {
        if (data.status === 200 && data.data) {
          const { accessToken } = data.data;
          setAccessToken(accessToken);
          navigate("/app/dashboard");
        }
      },
      onError: (error) => {
        const { param: field, msg: message } = error.response.data[0];
        setError(field, { message: message }, { shouldFocus: true });
        formState.isSubmitSuccessful(false);
      },
    });
  };

  return { signUpUser, loginUser };
}
