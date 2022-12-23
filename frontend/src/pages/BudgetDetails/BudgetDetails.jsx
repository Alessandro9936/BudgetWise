import { Link, useLocation } from "react-router-dom";
import { CloseModalIcon } from "../../components/UI/CloseModalIcon";
import Modal from "../../components/Utilities/Modal";
import { useCloseModal } from "../../hooks/useCloseModal";
import { useGetBudgetDetails } from "../../utils/queryBudget";
import classes from "./BudgetDetails.module.css";
import { BudgetProgressBar } from "../../components/UI/BudgetProgressBar";
import { Button } from "../../components/UI/Button";
import { endOfMonth, isFuture } from "date-fns";

export default function BudgetDetails() {
  const { activeTimeSpan } = useLocation().state;

  useCloseModal();
  const { data: budgetData, isLoading } = useGetBudgetDetails();

  const formatDate =
    activeTimeSpan === "Yearly"
      ? budgetData?.date.getFullYear()
      : budgetData?.date.toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
        });

  return (
    <>
      {!isLoading && (
        <Modal>
          <section className={classes["budget-detail__container"]}>
            <div className={classes["budget-detail__header"]}>
              <h1>Budget details</h1>
              <CloseModalIcon />
            </div>
            <div className={classes["budget-detail__type"]}>
              <p>Budget type</p>
              <p>{budgetData.name}</p>
            </div>
            <div className={classes["budget-detail__time"]}>
              <p>{activeTimeSpan === "Yearly" ? "Year" : "Month"}</p>
              <p>{formatDate}</p>
            </div>
            <div className={classes["budget-detail__bar"]}>
              <BudgetProgressBar budget={budgetData} />
            </div>
            {activeTimeSpan === "Monthly" &&
              isFuture(new Date(endOfMonth(budgetData.date))) && (
                <div className={classes["budget-detail__actions"]}>
                  <Link to={"update"}>
                    <Button>Update maximum amount of budget</Button>
                  </Link>
                </div>
              )}
          </section>
        </Modal>
      )}
    </>
  );
}
