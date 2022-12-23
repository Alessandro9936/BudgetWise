import classes from "../styles/BudgetDelete.module.css";
import Modal from "./Modal";
import { CloseModalIcon } from "../UI/CloseModalIcon";
import { ButtonRedirect } from "../UI/ButtonRedirect";
import { useDeleteBudget } from "../../utils/queryBudget";
import { SuccessRedirect } from "../UI/SuccessRedirect";
import { useDeleteTransaction } from "../../utils/queryTransactions";

export default function ModalDelete({ toDelete }) {
  const { isSuccess: budgetSuccess, deleteBudget } = useDeleteBudget();
  const { isSuccess: transactionSuccess, deleteTransaction } =
    useDeleteTransaction();

  let isSuccess = budgetSuccess || transactionSuccess;

  const handleDelete = () => {
    toDelete === "budget" ? deleteBudget() : deleteTransaction();
  };

  return (
    <Modal>
      <section className={classes["delete-container"]}>
        <div className={classes["delete__header"]}>
          <h1>Delete</h1>
          <CloseModalIcon />
        </div>
        <p className={classes.message}>
          Are you sure you want to delete this {toDelete}?
        </p>
        {!isSuccess ? (
          <div className={classes["delete-actions"]}>
            <button onClick={handleDelete} className={classes["delete-button"]}>
              Delete
            </button>
            <ButtonRedirect redirectLink={".."}>Go Back</ButtonRedirect>
          </div>
        ) : (
          <SuccessRedirect />
        )}
      </section>
    </Modal>
  );
}
