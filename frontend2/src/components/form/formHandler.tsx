import { motion } from "framer-motion";
import { LabelProcessType } from "@/types/processType";
import ButtonRedirect from "@/components/buttons/redirectButton";
import SubmitButton from "@/components/buttons/submitButton";
import FormResponse from "./formResponse";

type FormHandlerProps = {
  isSuccess: boolean;
  isLoading: boolean;
  isUpdate: boolean;
  label: LabelProcessType;
};

const FormHandler = ({
  isSuccess,
  isLoading,
  isUpdate,
  label,
}: FormHandlerProps) => {
  if (isSuccess && !isLoading) {
    const successMessage = !isUpdate
      ? `${label} successfully created`
      : `${label} successfully updated`;

    return (
      <FormResponse>
        <p className="font-semibold dark:text-slate-800">{successMessage}</p>
      </FormResponse>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="ml-auto flex w-fit justify-end gap-x-2"
    >
      <SubmitButton
        label={isUpdate ? `Update ${label}` : `Create ${label}`}
        isLoading={isLoading}
      />
      <ButtonRedirect
        redirect=".."
        styles="px-6 button-secondary"
        label="Go back"
      />
    </motion.div>
  );
};

export default FormHandler;
