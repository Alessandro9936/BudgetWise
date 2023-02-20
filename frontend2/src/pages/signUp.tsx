import SubmitButton from "@/components/buttons/submitButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/input/textInput";
import { useSignUp } from "@/services/user-services";
import RedirectLink from "@/components/links/redirectLink";
import PasswordRequirements from "@/components/form/passwordRequirements";
import HomeHeader from "@/layouts/homeHeader";
import PasswordInput from "@/components/input/passwordInput";

import {
  SignUpFormType,
  SignUpSchema,
  initialValues,
  FieldCurrency,
} from "@/features/signup";

const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SignUpFormType>({
    defaultValues: initialValues,
    resolver: zodResolver(SignUpSchema),
    mode: "onTouched",
  });

  const { signUp, isLoading } = useSignUp();
  const onSubmit = (formData: SignUpFormType) => signUp(formData, setError);

  return (
    <div className="flex flex-col">
      <HomeHeader />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-4 mb-4 flex w-screen flex-col gap-y-6 p-4 px-8 md:w-fit md:px-0"
      >
        <h1 className="mb-2">Create a new account</h1>

        {/* Firstname and lastname fields */}
        <div className="flex flex-col items-baseline gap-y-4 gap-x-4 md:flex-row md:gap-y-0">
          <TextInput
            type="text"
            name="firstName"
            label="First name"
            placeholder="John"
            isRequired={true}
            control={control}
            disabled={isLoading}
          />
          <TextInput
            type="text"
            name="lastName"
            label="Last name"
            placeholder="Doe"
            control={control}
            disabled={isLoading}
          />
        </div>

        {/* Email field */}
        <TextInput
          type="email"
          name="email"
          label="Your email"
          isRequired={true}
          placeholder="johndoe@example.com"
          control={control}
          disabled={isLoading}
        />

        {/* Budget Field */}
        <FieldCurrency
          setValue={setValue}
          getValues={getValues}
          error={errors.currency?.message}
        />
        {/* Password Field */}
        <PasswordInput
          name="password"
          label="Password"
          control={control}
          disabled={isLoading}
        />

        {/* Confirm assword field */}
        <PasswordInput
          name="confirmPassword"
          label="Confirm password"
          control={control}
          disabled={isLoading}
        />

        <PasswordRequirements />
        <SubmitButton label="Create account" isLoading={isLoading} />
        <p className="-mt-2 text-sm ">
          Do you have an account?{" "}
          <RedirectLink redirectTo="/login" label="Login" />
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
