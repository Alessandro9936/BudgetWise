import Card from "../../../components/Utilities/card";
import { useGetBudgetsByDate } from "../../../services/budget-services";

import ProgressBar from "../../../components/UI/progress-bar";
import allBudgets from "../../../constants/all-budgets";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BiEditAlt, BiTrashAlt } from "react-icons/bi";

const parentVariants = {
  initial: { opacity: 0 },
  ending: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.25,
      when: "beforeChildren",
      staggerChildren: 0.15,
      delay: 0.6,
    },
  },
};

const childVariants = {
  initial: { opacity: 0 },
  ending: {
    opacity: 1,
  },
};

interface IBudgetPreviews {
  activeDate: Date;
  timeSpan: string;
}
const BudgetPreviews = ({ activeDate, timeSpan }: IBudgetPreviews) => {
  const query = useGetBudgetsByDate(activeDate, timeSpan);
  const budgets = query?.data ?? [];

  const formatBudgetDate = (budgetDate: Date) => {
    return timeSpan === "Yearly"
      ? budgetDate.getFullYear()
      : `${budgetDate.toLocaleDateString(navigator.language, {
          month: "long",
          year: "numeric",
        })} `;
  };

  return (
    <motion.div
      variants={parentVariants}
      initial="initial"
      animate="ending"
      className="relative flex-1 overflow-auto"
    >
      <h3 className="mb-4 text-base font-semibold">Budget Previews</h3>
      <ul className="grid grid-cols-autoFillBudgets gap-8 overflow-y-auto">
        {budgets.map((budget) => {
          const budgetView = allBudgets.find(
            (_budget) => _budget.name === budget.name
          );

          return (
            <motion.li variants={childVariants} key={budget._id}>
              <Card classNames="dark:bg-slate-800 py-4 px-4">
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold">{budgetView?.label}</p>
                  {timeSpan === "Monthly" && (
                    <div className="flex items-center gap-2">
                      <Link to={`${budget._id}`}>
                        <BiEditAlt
                          size={20}
                          color={"#a3a3a3"}
                          cursor={"pointer"}
                        />
                      </Link>
                      <Link to={`${budget._id}/delete`}>
                        <BiTrashAlt
                          size={20}
                          color={"#a3a3a3"}
                          cursor={"pointer"}
                        />
                      </Link>
                    </div>
                  )}
                </div>
                <p className="mb-4 mt-1 text-xs font-semibold text-neutral-400">
                  {formatBudgetDate(budget.date)}
                </p>
                <ProgressBar budget={budget} />
              </Card>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default BudgetPreviews;
