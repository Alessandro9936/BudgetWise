import SubmitButton from "../../../components/Buttons/SubmitButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SignUpSchema from "./utils/validation-schema";
import { SignUpFormType } from "./types/types";

import InputText from "../../../components/Input/input-text";

import { useSignUp } from "../../../services/user-services";
import { Link } from "react-router-dom";
import FieldBudget from "./components/field-budget";
import  RedirectLink  from "../../../components/Buttons/RedirectLink";

const SignUpForm = () => {
  const initialValues: SignUpFormType = {
    firstName: "",
    lastName: "",
    email: "",
    userBudget: "",
    password: "",
    currency: "",
    confirmPassword: "",
  };

  const { control, handleSubmit, setError, setValue } = useForm<SignUpFormType>(
    {
      defaultValues: initialValues,
      resolver: zodResolver(SignUpSchema),
      mode: "onTouched",
    }
  );

  const { signUp, isLoading } = useSignUp();

  const onSubmit = (formData: SignUpFormType) => {
    signUp(formData, setError);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute top-2/4 left-2/4 flex w-screen -translate-x-2/4 -translate-y-2/4 flex-col gap-y-6 p-4 px-8 md:w-fit md:px-0"
    >
      <h1 className="mb-2 text-3xl font-bold">Start budgeting for free</h1>
      {/* First row - Firstname and lastname */}
      <div className="flex flex-col items-baseline gap-y-4 gap-x-4 md:flex-row md:gap-y-0">
        <InputText
          type="text"
          name="firstName"
          label="First name"
          placeholder="John"
          isRequired={true}
          control={control}
        />
        <InputText
          type="text"
          name="lastName"
          label="Last name"
          placeholder="Doe"
          control={control}
        />
      </div>
      {/* Second row - Email */}
      <InputText
        type="email"
        name="email"
        label="Your email"
        isRequired={true}
        placeholder="johndoe@example.com"
        control={control}
      />
      {/* Thrid row - Budget */}
      <FieldBudget control={control} name="userBudget" setValue={setValue} />
      {/* Fourth row - Password */}
      <InputText
        type="password"
        name="password"
        label="Password"
        isRequired={true}
        control={control}
      />
      {/* Fifth row - Confirm assword */}
      <InputText
        type="password"
        name="confirmPassword"
        label="Confirm password"
        isRequired={true}
        control={control}
      />
      <ul className="mx-4 flex list-disc justify-between gap-2 text-sm">
        <div>
          <li className="mb-2">A minimum of 8 characters</li>
          <li>At least one lowercase letter</li>
        </div>
        <div>
          <li className="mb-2">At least one number</li>
          <li>At least one upper letter</li>
        </div>
      </ul>
      <SubmitButton label="Register" isLoading={isLoading} />
      <p className="-mt-2 text-center text-sm md:text-left">
        Do you have an account?{" "}
        <RedirectLink redirectRoute="/login" label="Login" />
      </p>
    </form>
  );
};

export default SignUpForm;
