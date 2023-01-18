import axios from "axios";
import { UseFormSetError } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { SignUpFormType } from "../pages/user/signup/types/types";
import { LoginFormType } from "../pages/user/login/types/types";
import { useContext } from "react";
import { IUser, UserContext } from "../context/user-context";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
  IUpdateUserFormNoPassword,
  IUpdateUserFormPassword,
} from "../pages/user/update/types/types";
import { DeleteUserType } from "../pages/user/delete/user-delete";

type loginResponse = {
  firstName: string;
  lastName?: string;
  email: string;
  accessToken?: string;
  currency: string;
};

const useSignUp = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, isError } = useMutation((values: SignUpFormType) =>
    axios.post<201>("/api/register", values).then((res) => res.status)
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
          if (error.request.status !== 403 && error.request.status < 500) {
            const {
              param: field,
              msg: message,
            }: {
              param: "email" | "password";
              msg: string;
            } = error?.response?.data[0];
            setError(field, { message: message }, { shouldFocus: true });
          }
        }
      },
    });
  };

  return { signUp, isLoading, isError };
};

const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const { mutate, isLoading } = useMutation((values: LoginFormType) =>
    axios.post<loginResponse>("api/login", values).then((res) => res.data)
  );

  const login = (
    formData: LoginFormType,
    setError: UseFormSetError<LoginFormType>
  ) => {
    return mutate(formData, {
      onSuccess: (response) => {
        setUser(response);
        navigate("/dashboard", { replace: true });
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          if (error.request.status !== 403 && error.request.status < 500) {
            const {
              param: field,
              msg: message,
            }: { param: "email" | "password"; msg: string } =
              error?.response?.data[0];
            setError(field, { message: message }, { shouldFocus: true });
          }
        }
      },
    });
  };

  return { login, isLoading };
};

const useGetUser = () => {
  const axiosPrivate = useAxiosPrivate();

  const { data } = useQuery(
    ["user"],
    () => axiosPrivate.get<IUser>("/api/user").then((res) => res.data),

    { staleTime: Infinity }
  );

  return data;
};

const useUpdateUser = () => {
  const axiosPrivate = useAxiosPrivate();

  const { mutate, isLoading, isSuccess } = useMutation(
    (formData: IUpdateUserFormPassword | IUpdateUserFormNoPassword) =>
      axiosPrivate
        .put<loginResponse>("/api/user/", formData)
        .then((res) => res.data)
  );

  const updateUser = (
    formData: IUpdateUserFormPassword | IUpdateUserFormNoPassword,
    setError: UseFormSetError<
      IUpdateUserFormPassword | IUpdateUserFormNoPassword
    >
  ) => {
    return mutate(formData, {
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          if (error.request.status !== 403 && error.request.status < 500) {
            const {
              param: field,
              msg: message,
            }: { param: "email" | "password"; msg: string } =
              error?.response?.data[0];
            setError(
              field === "password" ? "oldPassword" : field,
              { message: message },
              { shouldFocus: true }
            );
          }
        }
      },
    });
  };

  return { updateUser, isLoading, isSuccess };
};

const useDeleteUser = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const { mutate, isLoading, isSuccess } = useMutation(
    (formData: DeleteUserType) =>
      axiosPrivate
        .delete<204>("/api/user", { data: { password: formData.password } })
        .then((res) => res.status)
  );

  const deleteUser = (
    formData: DeleteUserType,
    setError: UseFormSetError<DeleteUserType>
  ) => {
    return mutate(formData, {
      onSuccess: (status) => {
        if (status === 204) {
          navigate("/login", { replace: true });
        }
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          if (error.request.status !== 403 && error.request.status < 500) {
            const {
              param: field,
              msg: message,
            }: {
              param: "password";
              msg: string;
            } = error?.response?.data[0];
            setError(field, { message: message }, { shouldFocus: true });
          }
        }
      },
    });
  };
  return { deleteUser, isLoading, isSuccess };
};

const useLogoutUser = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const { mutate: logoutUser } = useMutation(
    () => axiosPrivate.post<204>("/api/user/logout").then((res) => res.status),
    {
      onSuccess: (status) => {
        if (status === 204) {
          navigate("/login", { replace: true });
        }
      },
    }
  );

  return { logoutUser };
};

export {
  useSignUp,
  useLogin,
  useGetUser,
  useUpdateUser,
  useDeleteUser,
  useLogoutUser,
};
