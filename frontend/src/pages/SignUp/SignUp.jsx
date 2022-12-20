import React from "react";

import classes from "./SignUp.module.css";

import { signUpSchema } from "./utils/SignUpSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUserFormActions } from "../../utils/userQueries";
import Input from "../../components/UI/InputText";
import UserActionForm from "../../components/Utilities/userActionsForm";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  userBudget: 0,
  password: "",
};

export default function SignUp() {
  const { handleSubmit, control, formState, setError } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(signUpSchema),
    mode: "onTouched",
  });
  const requestURL = "/api/register";
  const { signUpUser } = useUserFormActions(formState, setError, requestURL);

  const onSubmit = async (formData) => {
    signUpUser(formData);
  };

  return (
    <UserActionForm
      onSubmit={handleSubmit(onSubmit)}
      formTitle="Start budgeting for free"
      formState={formState}
      redirectLabel="Have an account?"
      redirectAction="Login"
    >
      <div className={classes["flex-field"]}>
        <div>
          <Input
            control={control}
            type="text"
            name="firstName"
            label="First name"
          />
        </div>
        <div>
          <Input
            control={control}
            type="text"
            name="lastName"
            label="Last name"
          />
        </div>
      </div>
      <div>
        <Input control={control} type="email" name="email" label="email" />
      </div>
      <div>
        <Input
          control={control}
          type="number"
          name="userBudget"
          label="Your starting budget"
        />
      </div>
      <div>
        <Input
          control={control}
          type="password"
          name="password"
          label="Password"
        />
      </div>
      <ul className={classes["password-requirements"]}>
        <div>
          <li>A minimum of 8 character</li>
          <li>At least one lowercase letter</li>
        </div>
        <div>
          <li>At least one number</li>
          <li>At least one upper letter</li>
        </div>
      </ul>
    </UserActionForm>
  );
}
