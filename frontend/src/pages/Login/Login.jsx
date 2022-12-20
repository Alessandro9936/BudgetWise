import { logInSchema } from "./utils/loginSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "../../components/UI/InputText";
import { useUserFormActions } from "../../utils/userQueries";
import UserActionForm from "../../components/Utilities/userActionsForm";

const initialValues = {
  email: "",
  password: "",
};

export function Login() {
  const { handleSubmit, control, formState, setError } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(logInSchema),
    mode: "onTouched",
  });

  const requestURL = "/api/login";
  const { loginUser } = useUserFormActions(formState, setError, requestURL);

  const onSubmit = (formData) => {
    loginUser(formData);
  };

  return (
    <UserActionForm
      onSubmit={handleSubmit(onSubmit)}
      formTitle="Login in to your account"
      formState={formState}
      redirectLabel="Don't have an account?"
      redirectAction="Register"
    >
      <Input control={control} type="email" name="email" label="Email" />
      <Input
        control={control}
        type="password"
        name="password"
        label="Password"
      />
    </UserActionForm>
  );
}
