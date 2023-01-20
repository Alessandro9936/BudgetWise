import SubmitButton from "../../../components/Buttons/SubmitButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, initialValues } from "./utils/validation-schema";
import { SignUpFormType } from "./types/types";

import InputText from "../../../components/Input/input-text";

import { useSignUp } from "../../../services/user/user-services";

import FieldBudget from "./components/field-budget";
import RedirectLink from "../../../components/Buttons/RedirectLink";
import PasswordRequirements from "../../../components/Form/password-requirements";
import { Eye } from "react-feather";
import { useState } from "react";

const SignUpForm = () => {
  const { control, handleSubmit, setError, setValue, getValues } =
    useForm<SignUpFormType>({
      defaultValues: initialValues,
      resolver: zodResolver(SignUpSchema),
      mode: "onTouched",
    });

  const { signUp, isLoading } = useSignUp();

  const onSubmit = (formData: SignUpFormType) => signUp(formData, setError);

  const [showPreview1, setShowPreview1] = useState(false);
  const [showPreview2, setShowPreview2] = useState(false);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="absolute top-2/4 left-2/4 flex w-screen -translate-x-2/4 -translate-y-2/4 flex-col gap-y-6 p-4 px-8 md:w-fit md:px-0"
      >
        <h1 className="mb-4">Create a new account</h1>
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
        <FieldBudget
          control={control}
          name="userBudget"
          setValue={setValue}
          getValues={getValues}
        />
        {/* Fourth row - Password */}
        <div className="relative -z-10">
          <InputText
            type={showPreview1 ? "text" : "password"}
            name="password"
            label="Password"
            isRequired={true}
            control={control}
          />

          <Eye
            onMouseDown={() => setShowPreview1(true)}
            onMouseUp={() => setShowPreview1(false)}
            onMouseLeave={() => setShowPreview1(false)}
            className="absolute top-1 right-0 cursor-pointer stroke-neutral-500 dark:stroke-neutral-400"
            size={19}
            strokeWidth={1.5}
          />
        </div>

        {/* Fifth row - Confirm assword */}
        <div className="relative -z-10">
          <InputText
            type={showPreview2 ? "text" : "password"}
            name="confirmPassword"
            label="Confirm password"
            isRequired={true}
            control={control}
          />

          <Eye
            onMouseDown={() => setShowPreview2(true)}
            onMouseUp={() => setShowPreview2(false)}
            onMouseLeave={() => setShowPreview2(false)}
            className="absolute top-1 right-0 cursor-pointer stroke-neutral-500 dark:stroke-neutral-400"
            size={19}
            strokeWidth={1.5}
          />
        </div>

        <PasswordRequirements />

        <SubmitButton label="Create account" isLoading={isLoading} />
        <p className="-mt-2 text-sm ">
          Do you have an account?{" "}
          <RedirectLink redirectTo="/login" label="Login" />
        </p>
      </form>
    </>
  );
};

export default SignUpForm;
