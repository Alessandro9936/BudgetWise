import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormHandler from "../../../components/Form/form-handler";
import CloseIcon from "../../../components/Icons/CloseIcon";
import InputText from "../../../components/Input/input-text";
import Modal from "../../../components/Utilities/modal";
import { useDeleteUser, useGetUser } from "../../../services/user-services";

const DeleteUserSchema = z.object({
  password: z.string().min(1, "To delete profile, password is required"),
});

export type DeleteUserType = z.infer<typeof DeleteUserSchema>;

const DeleteUserModal = () => {
  const { control, setError, handleSubmit } = useForm<DeleteUserType>({
    defaultValues: { password: "" },
    resolver: zodResolver(DeleteUserSchema),
  });

  const { deleteUser, isLoading, isSuccess } = useDeleteUser();

  const onSubmit = (formData: DeleteUserType) => deleteUser(formData, setError);

  return (
    <Modal>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-6"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Delete profile</h1>
          <CloseIcon />
        </div>
        <InputText
          label="Please type you password to confirm"
          type="password"
          name="password"
          control={control}
        />
        <FormHandler
          isLoading={isLoading}
          submitLabel="Delete profile"
          isSubmitSuccessful={isSuccess}
          redirect="/login"
        >
          <p>Profile successfully deleted</p>
        </FormHandler>
      </form>
    </Modal>
  );
};

export default DeleteUserModal;
