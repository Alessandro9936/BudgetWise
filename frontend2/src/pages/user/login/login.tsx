import RedirectLink from "./../../../components/Buttons/RedirectLink";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import SubmitButton from "../../../components/Buttons/SubmitButton";
import InputText from "../../../components/Input/input-text";
import { useLogin } from "../../../services/user/user-services";
import { LoginFormType } from "./types/types";
import { initialValues, LoginSchema } from "./utils/validation-schema";
import { useLocation } from "react-router-dom";
import { BiCheckCircle } from "react-icons/bi";
import Header from "../../../layouts/header";

const MessageRedirect = (): JSX.Element => {
  const { state } = useLocation();
  const messageRedirect = state?.message;

  return (
    messageRedirect && (
      <div className="flex items-center gap-1">
        <BiCheckCircle
          className="text-green-500 dark:text-green-400"
          size={22}
        />
        <p className="font-semibold italic text-green-500 dark:text-green-400">
          {messageRedirect}
        </p>
      </div>
    )
  );
};

const LoginForm = () => {
  const { control, handleSubmit, setError } = useForm<LoginFormType>({
    defaultValues: initialValues,
    resolver: zodResolver(LoginSchema),
  });

  const { login, isLoading } = useLogin();

  const onSubmit = (formData: LoginFormType) => login(formData, setError);
  return (
    <>
      <Header />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="absolute top-2/4 left-2/4 flex w-screen -translate-x-2/4 -translate-y-2/4 flex-col gap-y-6 p-4 px-8 md:w-fit md:px-0"
      >
        <MessageRedirect />
        <h1 className="mb-2 text-3xl font-bold">Login in to your account</h1>
        <InputText
          type="email"
          name="email"
          label="Email"
          placeholder="johndoe@example.com"
          control={control}
        />
        <InputText
          type="password"
          name="password"
          label="Password"
          control={control}
        />
        <SubmitButton label="Login" isLoading={isLoading} />
        <p className="-mt-2 text-center text-sm md:text-left">
          Don't have an account?{" "}
          <RedirectLink redirectTo="/register" label="Register" />
        </p>
      </form>
    </>
  );
};

export default LoginForm;
