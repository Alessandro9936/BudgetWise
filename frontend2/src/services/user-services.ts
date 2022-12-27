import axios from "axios";
import { UseFormSetError } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { SignUpFormType } from "../pages/user/signup/types/types";
import { LoginFormType } from "../pages/user/login/login";
import { setAccessToken } from "./accessTokenHandler";

const useSignUp = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation((values: SignUpFormType) =>
    axios.post<201>("/api/register", values).then((response) => response.status)
  );

  const signUp = (
    formData: SignUpFormType,
    setError: UseFormSetError<SignUpFormType>
  ) => {
    return mutate(formData, {
      onSuccess: (status) => {
        if (status === 201) {
          navigate("/login", { replace: true });
        }
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const { param: field, msg: message } = error?.response?.data[0];
          setError(field, { message: message }, { shouldFocus: true });
        } else {
          throw error;
        }
      },
    });
  };

  return { signUp, isLoading };
};

type loginResponse = {
  id: string;
  accessToken: string;
};
const useLogin = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation((values: LoginFormType) =>
    axios
      .post<loginResponse>("/api/login", values)
      .then((response) => response.data)
  );

  const login = (
    formData: LoginFormType,
    setError: UseFormSetError<LoginFormType>
  ) => {
    return mutate(formData, {
      onSuccess: (response) => {
        if (response.accessToken) {
          setAccessToken(response.accessToken);
          navigate("/app/dashboard", { replace: true });
        }
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const { param: field, msg: message } = error?.response?.data[0];
          setError(field, { message: message }, { shouldFocus: true });
        } else {
          throw error;
        }
      },
    });
  };

  return { login, isLoading };
};

export { useSignUp, useLogin };
