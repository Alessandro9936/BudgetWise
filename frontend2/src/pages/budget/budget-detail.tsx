import { endOfMonth, isFuture } from "date-fns";
import ButtonRedirect from "../../components/Buttons/ButtonRedirect";
import CloseIcon from "../../components/Icons/CloseIcon";
import Modal from "../../components/Utilities/modal";
import ProgressBar from "../../components/UI/progress-bar";
import TransactionCard from "../../components/UI/TransactionCard";
import { useCloseModal } from "../../hooks/useCloseWindow";
import { useGetBudgetDetails } from "../../services/budget-services";
import { useGetTransactionsBudgetPreview } from "../../services/transaction-services";
import budgets from "../../constants/all-budgets";

const BudgetDetails = () => {
  useCloseModal();

  const queryBudgetDetail = useGetBudgetDetails();
  const budgetDetails = queryBudgetDetail?.data;

  const queryTransactionsInBudget =
    useGetTransactionsBudgetPreview(budgetDetails);
  const transactionsInBudget = queryTransactionsInBudget?.data;

  const budgetColor = budgets.find(
    (_budget) => _budget.name === budgetDetails?.name
  )?.color;

  return (
    <>
      {transactionsInBudget && budgetDetails && (
        <Modal>
          <section className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Budget details</h1>
              <CloseIcon />
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Budget type</p>
              <p
                className="rounded-lg border-2 px-2 py-[2px] font-semibold"
                style={{ borderColor: budgetColor, color: budgetColor }}
              >
                {budgetDetails.name}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Budget month</p>
              <p>
                {budgetDetails.date.toLocaleDateString(navigator.language, {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            {transactionsInBudget.length > 0 && (
              <div className="flex max-h-[300px] flex-col gap-y-2 overflow-y-auto p-1">
                {transactionsInBudget.map((transaction) => (
                  <TransactionCard
                    key={transaction._id}
                    transaction={transaction}
                    disabled={true}
                  />
                ))}
              </div>
            )}
            <div>
              <ProgressBar budget={budgetDetails} />
            </div>
            {isFuture(new Date(endOfMonth(budgetDetails.date))) && (
              <ButtonRedirect
                redirect="update"
                label="Update maximum amount of budget"
                styles="bg-slate-900 hover:bg-purple-500 text-white"
              />
            )}
          </section>
        </Modal>
      )}
    </>
  );
};
export default BudgetDetails;
