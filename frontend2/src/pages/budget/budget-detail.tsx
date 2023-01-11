import { endOfMonth, isFuture } from "date-fns";
import ButtonRedirect from "../../components/Buttons/ButtonRedirect";
import CloseIcon from "../../components/Icons/CloseIcon";
import Modal from "../../components/modal";
import ProgressBar from "../../components/progress-bar";
import { useCloseModal } from "../../hooks/useCloseWindow";
import { useGetBudgetDetails } from "../../services/budget-services";

const BudgetDetails = () => {
  useCloseModal();
  const queryBudgetDetail = useGetBudgetDetails();
  const budgetDetails = queryBudgetDetail?.data;
  const isLoading = queryBudgetDetail?.isLoading;

  return (
    <>
      {!isLoading && budgetDetails && (
        <Modal>
          <section className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Budget details</h1>
              <CloseIcon />
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Budget type</p>
              <p>{budgetDetails.name}</p>
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