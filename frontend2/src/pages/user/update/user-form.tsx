import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";
import ButtonRedirect from "../../../components/Buttons/ButtonRedirect";
import SubmitButton from "../../../components/Buttons/SubmitButton";
import PasswordRequirements from "../../../components/Form/password-requirements";

import InputText from "../../../components/Input/input-text";
import Card from "../../../components/Utilities/card";
import { useCloseModal } from "../../../hooks/useCloseWindow";
import {
  useGetUser,
  useUpdateUser,
} from "../../../services/user/user-services";
import { userFormNoPassword, userFormPassword } from "./types/types";
import {
  initialValues,
  noPasswordSchema,
  passwordSchema,
} from "./utils/validation-schema";

import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import useCheckMobile from "../../../hooks/useCheckMobile";
import { parentVariants, childrenVariants } from "./utils/variants";

import MobileLogout from "./components/MobileLogout";
import { formatDate } from "../../../services/format/date";
import ToggleMenus from "../../../components/Icons/ToggleMenu";

const UserForm = () => {
  useCloseModal();
  const { isMobile } = useCheckMobile();

  const { data: loggedUser, isLoading } = useGetUser();
  const { updateUser, isSuccess } = useUpdateUser();

  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const { handleSubmit, reset, control, setError } = useForm<
    userFormPassword | userFormNoPassword
  >({
    defaultValues: initialValues,
    resolver: zodResolver(
      isUpdatingPassword ? passwordSchema : noPasswordSchema
    ),
    mode: "onTouched",
  });

  // When user details are available reset defaultValues of form
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

  const onSubmit = (formData: userFormPassword | userFormNoPassword) => {
    updateUser(formData, setError);
  };

  return (
    <section className="flex w-full flex-1 flex-col items-center gap-6 bg-gray-100 p-6 overflow-x-hidden dark:bg-slate-900">
      <Card classNames=" dark:bg-slate-800 w-full flex-1 p-6 mb-16 midsm:mb-0">
        {!isLoading ? (
          <motion.form
            variants={parentVariants}
            initial="initial"
            animate="ending"
            exit="exit"
            onSubmit={handleSubmit(onSubmit)}
            className="flex h-full flex-1 flex-col gap-y-4"
          >
            <motion.div
              variants={childrenVariants}
              className="flex items-center justify-between"
            >
              <h1 className="text-2xl font-semibold">Your Profile</h1>
              {isMobile && <MobileLogout />}
            </motion.div>
            <motion.p variants={childrenVariants} className="font-medium">
              Created: {formatDate(new Date(loggedUser?.createdAt!))}
            </motion.p>

            <motion.div
              variants={childrenVariants}
              className="flex flex-col gap-y-4 gap-x-4 md:flex-row md:gap-y-0"
            >
              <InputText
                disabled={isSuccess}
                type="text"
                name="firstName"
                label="First name"
                control={control}
              />
              <InputText
                disabled={isSuccess}
                type="text"
                name="lastName"
                label="Last name"
                control={control}
              />
            </motion.div>
            <motion.div variants={childrenVariants}>
              <InputText
                disabled={isSuccess}
                type="email"
                name="email"
                label="Your email"
                control={control}
              />
            </motion.div>
            <motion.div
              variants={childrenVariants}
              onClick={() => setIsUpdatingPassword((prev) => !prev)}
              className="flex cursor-pointer items-center"
            >
              <p className="w-40">
                {isUpdatingPassword ? "Hide password" : "Update password"}
              </p>
              <ToggleMenus trigger={isUpdatingPassword} />
            </motion.div>

            <AnimatePresence>
              {isUpdatingPassword && (
                <motion.div
                  key="passwords"
                  exit="exit"
                  initial="initial"
                  animate="ending"
                  variants={parentVariants}
                  className="flex flex-col gap-y-4"
                >
                  <motion.div variants={childrenVariants} key="oldPassword">
                    <InputText
                      disabled={isSuccess}
                      type="password"
                      name="oldPassword"
                      label="Current Password"
                      control={control}
                    />
                  </motion.div>
                  <motion.div variants={childrenVariants} key="password">
                    <InputText
                      disabled={isSuccess}
                      type="password"
                      name="password"
                      label="Password"
                      control={control}
                    />
                  </motion.div>
                  <motion.div variants={childrenVariants}>
                    <PasswordRequirements />
                  </motion.div>

                  <motion.div variants={childrenVariants} key="confirmPassword">
                    <InputText
                      disabled={isSuccess}
                      type="password"
                      name="confirmPassword"
                      label="Confirm password"
                      control={control}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              variants={childrenVariants}
              className="flex flex-1 flex-col items-stretch justify-end gap-4 midsm:flex-row midsm:items-end"
            >
              <SubmitButton label="Update profile" isLoading={isLoading} />

              <ButtonRedirect
                redirect="delete"
                label="Delete profile"
                styles="button-delete px-6"
              />
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
