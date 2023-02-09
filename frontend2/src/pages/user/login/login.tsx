import RedirectLink from "../../../components/links/redirectLink";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SubmitButton from "../../../components/buttons/submitButton";
import TextInput from "../../../components/input/textInput";
import { useLogin } from "../../../services/user-services";
import { LoginFormType } from "./types/schemaType";
import { initialValues, LoginSchema } from "./utils/validation-schema";
import HomeHeader from "../../../layouts/homeHeader";
import PasswordInput from "../../../components/input/passwordInput";
import MessageRedirect from "./components/messageRedirect";

const LoginForm = () => {
  const { control, handleSubmit, setError } = useForm<LoginFormType>({
    defaultValues: initialValues,
    resolver: zodResolver(LoginSchema),
  });

  const { login, isLoading } = useLogin();

  const onSubmit = (formData: LoginFormType) => login(formData, setError);
  return (
    <>
      <HomeHeader />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="absolute top-2/4 left-2/4 flex w-screen -translate-x-2/4 -translate-y-2/4 flex-col gap-y-6 p-4 px-8 md:w-fit md:px-0"
      >
        <MessageRedirect />
        <h1 className="mb-2 text-3xl font-bold">Login in to your account</h1>
        <TextInput
          type="email"
          name="email"
          label="Email"
          placeholder="johndoe@example.com"
          control={control}
        />
        <PasswordInput name="password" label="Password" control={control} />

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
