import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";
import ButtonRedirect from "@/components/buttons/redirectButton";
import SubmitButton from "@/components/buttons/submitButton";
import PasswordRequirements from "@/components/form/passwordRequirements";
import TextInput from "@/components/input/textInput";
import Card from "@/components/wrapper/card";
import { useGetUser, useUpdateUser } from "@/services/user-services";
import { AnimatePresence, motion } from "framer-motion";
import useCheckMobile from "@/hooks/useCheckMobile";
import { formatDate } from "@/services/format/date";
import ToggleIcon from "@/components/icons/toggleIcon";
import PasswordInput from "@/components/input/passwordInput";

import {
  UserFormNoPassword,
  UserFormPassword,
  initialValues,
  noPasswordSchema,
  passwordSchema,
  MobileLogout,
} from "@/features/userUpdate";
import {
  parentVariants,
  transitionFadeInVariants,
} from "@/utils/reusableVariants";

const UserForm = () => {
  const { isMobile } = useCheckMobile();

  const { data: loggedUser, isLoading: isLoadingUser } = useGetUser();
  const { updateUser, isSuccess, isLoading: isUpdatingUser } = useUpdateUser();

  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const { handleSubmit, reset, control, setError } = useForm<
    UserFormPassword | UserFormNoPassword
  >({
    defaultValues: initialValues,
    resolver: zodResolver(
      isUpdatingPassword ? passwordSchema : noPasswordSchema
    ),
    mode: "onTouched",
  });

  // When user details are available reset form defaultValues
  useEffect(() => {
    if (loggedUser) {
      reset({
        ...loggedUser,
        password: "",
        confirmPassword: "",
        oldPassword: "",
      });
    }
  }, [loggedUser]);

  const onSubmit = (formData: UserFormPassword | UserFormNoPassword) => {
    updateUser(formData, setError);
  };

  return (
    <section className="flex w-full flex-1 flex-col items-center gap-6 overflow-x-hidden bg-gray-100 p-6 dark:bg-slate-900">
      <Card classNames=" dark:bg-slate-800 w-full flex-1 p-6 mb-16 midsm:mb-0">
        {!isLoadingUser && loggedUser ? (
          <motion.form
            variants={parentVariants}
            custom={0.15}
            initial="initial"
            animate="ending"
            exit="exit"
            onSubmit={handleSubmit(onSubmit)}
            className="flex h-full flex-1 flex-col gap-y-4"
          >
            <motion.div
              variants={transitionFadeInVariants}
              transition={{ type: "tween" }}
              className="flex items-center justify-between"
            >
              <h1 className="text-2xl font-semibold">Your Profile</h1>
              {isMobile && <MobileLogout />}
            </motion.div>

            <motion.p
              variants={transitionFadeInVariants}
              transition={{ type: "tween" }}
              className="font-medium"
            >
              Created: {formatDate(new Date(loggedUser.createdAt!))}
            </motion.p>

            <motion.div
              variants={transitionFadeInVariants}
              transition={{ type: "tween" }}
              className="flex flex-col gap-y-4 gap-x-4 md:flex-row md:gap-y-0"
            >
              <TextInput
                disabled={isSuccess}
                type="text"
                name="firstName"
                label="First name"
                isRequired={true}
                control={control}
              />
              <TextInput
                disabled={isSuccess}
                type="text"
                name="lastName"
                label="Last name"
                control={control}
              />
            </motion.div>

            <motion.div
              variants={transitionFadeInVariants}
              transition={{ type: "tween" }}
            >
              <TextInput
                disabled={isSuccess}
                type="email"
                name="email"
                isRequired={true}
                label="Your email"
                control={control}
              />
            </motion.div>
            <motion.div
              variants={transitionFadeInVariants}
              transition={{ type: "tween" }}
              onClick={() => setIsUpdatingPassword((prev) => !prev)}
              className="flex cursor-pointer items-center"
            >
              <p className="w-40">
                {isUpdatingPassword ? "Hide password" : "Update password"}
              </p>
              <ToggleIcon trigger={isUpdatingPassword} />
            </motion.div>

            <AnimatePresence>
              {isUpdatingPassword && (
                <motion.div
                  key="passwords"
                  exit="exit"
                  initial="initial"
                  animate="ending"
                  variants={parentVariants}
                  custom={0.15}
                  className="flex flex-col gap-y-4"
                >
                  <motion.div
                    variants={transitionFadeInVariants}
                    transition={{ type: "tween" }}
                    key="oldPassword"
                  >
                    <PasswordInput
                      disabled={isSuccess}
                      name="oldPassword"
                      label="Current Password"
                      control={control}
                    />
                  </motion.div>
                  <motion.div
                    variants={transitionFadeInVariants}
                    transition={{ type: "tween" }}
                    key="password"
                  >
                    <PasswordInput
                      disabled={isSuccess}
                      name="password"
                      label="Password"
                      control={control}
                    />
                  </motion.div>
                  <motion.div
                    variants={transitionFadeInVariants}
                    transition={{ type: "tween" }}
                  >
                    <PasswordRequirements />
                  </motion.div>

                  <motion.div
                    variants={transitionFadeInVariants}
                    transition={{ type: "tween" }}
                    key="confirmPassword"
                  >
                    <PasswordInput
                      disabled={isSuccess}
                      name="confirmPassword"
                      label="Confirm password"
                      control={control}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              variants={transitionFadeInVariants}
              transition={{ type: "tween" }}
              className="flex flex-1 flex-col items-stretch justify-end gap-4 midsm:flex-row midsm:items-end"
            >
              <SubmitButton label="Update profile" isLoading={isUpdatingUser} />

              {!isUpdatingUser && (
                <ButtonRedirect
                  redirect="delete"
                  label="Delete profile"
                  styles="button-delete px-6"
                />
              )}
            </motion.div>
          </motion.form>
        ) : (
          <h3>Loading...</h3>
        )}
      </Card>
      <Outlet />
    </section>
  );
};
export default UserForm;
