import axios, { AxiosInstance } from "axios";
import { UseFormSetError } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SignUpFormType } from "@/features/signup";
import { LoginFormType } from "@/features/login/types/formType";
import { UserProps } from "@/types/userType";
import { UserFormNoPassword, UserFormPassword } from "@/features/userUpdate";
import { UserContext } from "@/context/userContext";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { DeleteUserType } from "@/features/userDelete";

export type LoginResponse = {
  firstName: string;
  lastName?: string;
  email: string;
  accessToken?: string;
  currency: string;
};

const signUpFn = async (formData: SignUpFormType) => {
  const result = await axios.post<201>("/api/register", formData);
  return result.status;
};

const loginFn = async (formData: LoginFormType) => {
  const result = await axios.post<LoginResponse>("/api/login", formData);
  return result.data;
};

const getUserFn = async (instance: AxiosInstance) => {
  const result = await instance.get<UserProps>("/api/user");
  return result.data;
};

const updateUserFn = async (
  instance: AxiosInstance,
  formData: UserFormPassword | UserFormNoPassword
) => {
  const result = await instance.put("/api/user/", formData);
  return result.data;
};

const deleteUserFn = async (instance: AxiosInstance, password: string) => {
  const result = await instance.delete<204>("/api/user", {
    data: { password },
  });

  return result.status;
};

const logoutUserFn = async (instance: AxiosInstance) => {
  const result = await instance.post<204>("/api/user/logout");
  return result.status;
};

/* -------- */

const useSignUp = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation((formData: SignUpFormType) =>
    signUpFn(formData)
  );

  const signUp = (
    formData: SignUpFormType,
    setError: UseFormSetError<SignUpFormType>
  ) => {
    return mutate(formData, {
      onSuccess: (status) => {
        if (status === 201) {
          navigate("/login", {
            replace: true,
            state: {
              message: "Account successfully created",
            },
          });
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

  return { signUp, isLoading };
};

const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const { mutate, isLoading } = useMutation((formData: LoginFormType) =>
    loginFn(formData)
  );

  const login = (
    formData: LoginFormType,
    setError: UseFormSetError<LoginFormType>
  ) => {
    return mutate(formData, {
      onSuccess: (userData) => {
        setUser(userData);
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

  return useQuery("user", () => getUserFn(axiosPrivate));
};

const useUpdateUser = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const { mutate, isLoading, isSuccess } = useMutation(
    (formData: UserFormPassword | UserFormNoPassword) =>
      updateUserFn(axiosPrivate, formData)
  );

  const updateUser = (
    formData: UserFormPassword | UserFormNoPassword,
    setError: UseFormSetError<UserFormPassword | UserFormNoPassword>
  ) => {
    return mutate(formData, {
      onSuccess: async () => {
        navigate("/login", {
          replace: true,
          state: {
            message: "Profile successfully updated",
          },
        });
      },
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
    (formData: DeleteUserType) => deleteUserFn(axiosPrivate, formData.password)
  );

  const deleteUser = (
    formData: DeleteUserType,
    setError: UseFormSetError<DeleteUserType>
  ) => {
    return mutate(formData, {
      onSuccess: (status) => {
        if (status === 204) {
          navigate("/login", {
            replace: true,
            state: {
              message: "Profile successfully deleted",
            },
          });
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

  const { mutate: logoutUser } = useMutation(() => logoutUserFn(axiosPrivate), {
    onSuccess: (status) => {
      if (status === 204) {
        navigate("/login", { replace: true });
      }
    },
  });

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
