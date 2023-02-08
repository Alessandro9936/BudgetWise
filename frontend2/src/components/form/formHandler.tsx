import { motion } from "framer-motion";
import ButtonRedirect from "../buttons/redirectButton";
import SubmitButton from "../buttons/submitButton";
import FormResponse from "./formResponse";

type FormHandlerProps = {
  isSuccess: boolean;
  isLoading: boolean;
  isUpdate: boolean;
  label: "Budget" | "Transaction";
};

const FormHandler = ({
  isSuccess,
  isLoading,
  isUpdate,
  label,
}: FormHandlerProps) => {
  return (
    <>
      {!isSuccess && (
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
      )}
      {isSuccess && !isLoading && (
        <FormResponse>
          <p className="font-semibold dark:text-slate-800">
            {!isUpdate
              ? `${label} successfully created`
              : `${label} successfully updated`}
          </p>
        </FormResponse>
      )}
    </>
  );
};
export default FormHandler;
