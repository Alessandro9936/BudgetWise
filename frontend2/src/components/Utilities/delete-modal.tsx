import CloseIcon from "../Icons/CloseIcon";
import Modal from "./modal";
import ButtonRedirect from "../Buttons/ButtonRedirect";
import { useCloseModal } from "../../hooks/useCloseWindow";
import { useDeleteTransaction } from "../../services/transaction-services";
import { useDeleteBudget } from "../../services/budget-services";
import { useNavigate } from "react-router-dom";
import FormResponse from "../Form/form-response";

const DeleteModal = ({ toDelete }: { toDelete: "transaction" | "budget" }) => {
  useCloseModal();

  const navigate = useNavigate();

  const transactionDelete = useDeleteTransaction();
  const budgetDelete = useDeleteBudget();

  const handleDelete = () => {
    toDelete === "transaction"
      ? transactionDelete.mutate()
      : budgetDelete.mutate();
  };

  const isSubmitSuccessful =
    toDelete === "transaction"
      ? transactionDelete.isSuccess
      : budgetDelete.isSuccess;
  const isLoadingSubmission =
    toDelete === "transaction"
      ? transactionDelete.isLoading
      : budgetDelete.isLoading;

  return (
    <Modal>
      <section className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Delete {toDelete}</h1>
          <CloseIcon />
        </div>
        {!isSubmitSuccessful && (
          <>
            <p>Are you sure you want to delete this {toDelete}?</p>
            <div className="ml-auto flex items-center gap-2">
              <button onClick={handleDelete} className="button-delete px-6">
                Delete
              </button>
              <ButtonRedirect
                label="Go back"
                redirect={".."}
                styles=" button-secondary px-6"
              />
            </div>
          </>
        )}
        {isSubmitSuccessful && !isLoadingSubmission && (
          <FormResponse>
            <p className="font-semibold dark:text-slate-800">
              {toDelete === "transaction"
                ? "Transaction successfully deleted"
                : "Budget successfully updated"}
            </p>
          </FormResponse>
        )}
      </section>
    </Modal>
  );
};

export default DeleteModal;
