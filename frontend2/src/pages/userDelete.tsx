import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ButtonRedirect from "@/components/buttons/redirectButton";
import CloseIcon from "@/components/icons/closeIcon";
import TextInput from "@/components/input/textInput";
import Modal from "@/components/modal/modal";
import { useDeleteUser } from "@/services/user-services";

import { DeleteUserType, DeleteUserSchema } from "@/features/userDelete";
import DeleteButton from "@/components/buttons/deleteButton";

const DeleteUserModal = () => {
  const { control, setError, handleSubmit } = useForm<DeleteUserType>({
    defaultValues: { password: "" },
    resolver: zodResolver(DeleteUserSchema),
  });

  const { deleteUser, isLoading } = useDeleteUser();

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
        <TextInput
          label="Please type your password to confirm"
          type="password"
          name="password"
          control={control}
        />
        <div className="ml-auto flex items-center gap-4">
          <DeleteButton label="Delete profile" isLoading={isLoading} />
          {!isLoading && (
            <ButtonRedirect
              redirect=".."
              styles="px-6 button-secondary"
              label="Go back"
            />
          )}
        </div>
      </form>
    </Modal>
  );
};

export default DeleteUserModal;
