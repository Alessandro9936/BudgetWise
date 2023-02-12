import FormResponse from "@/components/form/formResponse";
import Modal from "./modal";
import ButtonRedirect from "@/components/buttons/redirectButton";
import ModalHeader from "./modalHeader";
import { useCloseModal } from "@/hooks/useCloseWindow";
import { useDeleteTransaction } from "@/services/transaction-services";
import { useDeleteBudget } from "@/services/budget-services";

// Since the UI was the same DeleteModal has the functionality to delete both transactions and budgets
// using an union type prop (toDelete) to determine which element must be deleted
const DeleteModal = ({ toDelete }: { toDelete: "transaction" | "budget" }) => {
  useCloseModal();
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
        <ModalHeader label={`Delete ${toDelete}`} />

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
