import axios from "axios";
import { UseFormSetError } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { SignUpFormType } from "../pages/user/signup/types/types";
import { LoginFormType } from "../pages/user/login/types/types";
import { setAccessToken } from "./accessTokenHandler";

const signUpFn = async (formData: SignUpFormType) => {
  const response = await axios.post<201>("/api/register", formData);
  return response.status;
};

type loginResponse = {
  id: string;
  accessToken: string;
};

const loginFn = async (loginData: LoginFormType) => {
  const response = await axios.post<loginResponse>("api/login", loginData);
  return response.data;
};

const useSignUp = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation((values: SignUpFormType) =>
    signUpFn(values)
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
          const {
            param: field,
            msg: message,
          }: {
            param: "email" | "password";
            msg: string;
          } = error?.response?.data[0];
          setError(field, { message: message }, { shouldFocus: true });
        } else {
          throw error;
        }
      },
    });
  };

  return { signUp, isLoading };
};

const useLogin = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation((values: LoginFormType) =>
    loginFn(values)
  );

  const login = (
    formData: LoginFormType,
    setError: UseFormSetError<LoginFormType>
  ) => {
    return mutate(formData, {
      onSuccess: (response) => {
        if (response.accessToken) {
          setAccessToken(response.accessToken);
          navigate("/dashboard", { replace: true });
        }
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const {
            param: field,
            msg: message,
          }: { param: "email" | "password"; msg: string } =
            error?.response?.data[0];
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
