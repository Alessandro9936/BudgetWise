import { ButtonRedirect } from "../../components/UI/ButtonRedirect";
import { Button } from "../../components/UI/Button";
import { CloseModalIcon } from "../../components/UI/CloseModalIcon";
import Modal from "../../components/Utilities/Modal";
import { useCloseModal } from "../../hooks/useCloseModal";
import { useGetTransactionDetails } from "../../utils/queryTransactions";
import classes from "./TransactionDetail.module.css";
import { Link } from "react-router-dom";

export default function TransactionDetail() {
  useCloseModal();
  const { data: transactionData, isLoading } = useGetTransactionDetails();

  return (
    !isLoading && (
      <Modal>
        <section className={classes["transaction-detail__container"]}>
          <div className={classes["transaction-detail__header"]}>
            <h1>Transaction details</h1>
            <CloseModalIcon />
          </div>
          <div className={classes["transaction-detail__type"]}>
            <p>Type</p>
            <p>{transactionData.type}</p>
          </div>
          <div className={classes["transaction-detail__date"]}>
            <p>Date</p>
            <p>
              {transactionData.date.toLocaleDateString("en-GB", {
                weekday: "long",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          {transactionData.type === "expense" && (
            <>
              <div className={classes["transaction-detail__budget"]}>
                <p>Budget</p>
                <p>{transactionData.budget.name}</p>
              </div>
              <div className={classes["transaction-detail__state"]}>
                <p>State</p>
                <p>{transactionData.state}</p>
              </div>
            </>
          )}
          <div className={classes["transaction-detail__amount"]}>
            <p>Amount</p>
            <p>{transactionData.amount} $</p>
          </div>
          <div className={classes["transaction-detail__description"]}>
            <p>Description</p>
            <p>{transactionData.description}</p>
          </div>
          <div className={classes["transaction-detail__actions"]}>
            <Link to={"update"}>
              <Button>Update</Button>
            </Link>
            <ButtonRedirect redirectLink={"delete"}>Delete</ButtonRedirect>
          </div>
        </section>
      </Modal>
    )
  );
}
