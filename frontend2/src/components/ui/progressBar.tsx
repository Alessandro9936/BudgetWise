import { BudgetResponse } from "@/services/budget-services";
import { getBudgetUI } from "@/utils/getBudgetUI";
import { motion } from "framer-motion";
import { scaleFadeInVariants } from "@/utils/reusableVariants";
import { getCurrency } from "@/context/userContext";

const ProgressBar = ({ budget }: { budget: BudgetResponse }) => {
  const currency = getCurrency();

  const percentageSpent = Math.ceil(
    (budget.usedAmount / budget.maxAmount) * 100
  );

  const budgetColor = getBudgetUI(budget.name)?.color;

  return (
    <div>
      <p className="mb-2 text-sm">
        <span
          className={`font-semibold ${
            budget.maxAmount >= budget.usedAmount
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {budget.maxAmount - budget.usedAmount} {currency}
        </span>{" "}
        left from {budget.maxAmount} {currency}
      </p>
      <div className="w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-slate-700">
        <motion.span
          style={{
            width: `${percentageSpent}%`,
            maxWidth: "100%",
            backgroundColor: budgetColor,
          }}
          variants={scaleFadeInVariants}
          className="block origin-left rounded-full p-1 text-center text-xs font-semibold leading-none text-white"
        >
          {percentageSpent}%
        </motion.span>
      </div>
    </div>
  );
};

export default ProgressBar;
