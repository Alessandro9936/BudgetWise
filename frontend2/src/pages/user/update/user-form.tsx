import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";
import ButtonRedirect from "../../../components/Buttons/ButtonRedirect";
import SubmitButton from "../../../components/Buttons/SubmitButton";
import FormHandler from "../../../components/Form/form-handler";
import PasswordRequirements from "../../../components/Form/password-requirements";

import CloseIcon from "../../../components/Icons/CloseIcon";
import InputText from "../../../components/Input/input-text";
import Card from "../../../components/Utilities/card";
import Modal from "../../../components/Utilities/modal";
import { useCloseModal } from "../../../hooks/useCloseWindow";
import { useGetUser, useUpdateUser } from "../../../services/user-services";
import {
  IUpdateUserFormNoPassword,
  IUpdateUserFormPassword,
} from "./types/types";
import {
  UserUpdateSchemaNoPasswords,
  UserUpdateSchemaPasswords,
} from "./utils/validation-schema";

const UserForm = () => {
  useCloseModal();
  const user = useGetUser();
  const { updateUser, isLoading, isSuccess } = useUpdateUser();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  const { handleSubmit, reset, control, setError } = useForm<
    IUpdateUserFormPassword | IUpdateUserFormNoPassword
  >({
    defaultValues: initialValues,
    resolver: zodResolver(
      isUpdatingPassword
        ? UserUpdateSchemaPasswords
        : UserUpdateSchemaNoPasswords
    ),
    mode: "onTouched",
  });

  useEffect(() => {
    if (user) {
      reset({ ...user, password: "", confirmPassword: "", oldPassword: "" });
    }
  }, [user, isUpdatingPassword]);

  const onSubmit = (
    formData: IUpdateUserFormPassword | IUpdateUserFormNoPassword
  ) => {
    updateUser(formData, setError);
  };

  return (
    <section className="flex w-full flex-1 flex-col gap-6 overflow-x-hidden bg-gray-100 p-6">
      <Card classNames="w-1/2 flex-1">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full flex-1 flex-col gap-y-4 p-6"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Your Profile</h1>
          </div>
          <p className="font-medium">
            Created:{" "}
            {new Date(user?.createdAt!).toLocaleDateString(navigator.language, {
              dateStyle: "long",
            })}
          </p>

          <div className="flex flex-col items-baseline gap-y-4 gap-x-4 md:flex-row md:gap-y-0">
            <InputText
              disabled={!isUpdating}
              type="text"
              name="firstName"
              label="First name"
              control={control}
            />
            <InputText
              disabled={!isUpdating}
              type="text"
              name="lastName"
              label="Last name"
              control={control}
            />
          </div>
          <InputText
            disabled={!isUpdating}
            type="email"
            name="email"
            label="Your email"
            control={control}
          />
          {isUpdating && !isUpdatingPassword && (
            <p
              onClick={() => setIsUpdatingPassword(true)}
              className="cursor-pointer transition-colors hover:text-purple-500"
            >
              Update password
            </p>
          )}

          {isUpdating && isUpdatingPassword && (
            <>
              <InputText
                type="password"
                name="oldPassword"
                label="Current Password"
                control={control}
              />
              <InputText
                type="password"
                name="password"
                label="Password"
                control={control}
              />
              <PasswordRequirements />
              <InputText
                type="password"
                name="confirmPassword"
                label="Confirm password"
                control={control}
              />
            </>
          )}

          <div className="mt-auto flex w-full items-center justify-end gap-x-2">
            {!isUpdating && (
              <>
                <button
                  type="button"
                  onClick={() => setIsUpdating(true)}
                  className="ml-auto w-fit rounded-lg bg-slate-900 px-6 py-3 text-center font-semibold text-white transition hover:bg-purple-500"
                >
                  Start updating
                </button>
                <ButtonRedirect
                  styles="disabled:pointer-events-none disabled:bg-slate-200 px-6 bg-white text-red-500 ring-1 ring-red-500 hover:bg-red-500 hover:text-white"
                  redirect="delete"
                  label="Delete profile"
                />
              </>
            )}
            {isUpdating && !isSuccess && (
              <div className="ml-auto flex w-fit justify-end gap-x-2">
                <SubmitButton
                  label="Update profile"
                  styles="px-6"
                  isLoading={isLoading}
                />

                <button
                  onClick={() => {
                    setIsUpdating(false);
                    setIsUpdatingPassword(false);
                  }}
                  className="rounded-lg bg-white px-6 py-3 text-center font-semibold text-purple-500 ring-1 ring-purple-500 transition disabled:pointer-events-none disabled:bg-slate-200"
                >
                  Cancel
                </button>
              </div>
            )}

            {isSuccess && !isLoading && (
              <div className="flex w-full justify-center gap-x-2 rounded-lg bg-green-500 py-3 text-white">
                <p className="text-center font-semibold">
                  Profile successfully updated
                </p>
              </div>
            )}
          </div>
        </form>
      </Card>
      <Outlet />
    </section>
  );
};
export default UserForm;
