import { IBudgetResponse } from "../../services/budget-services";

import budgetColors from "../../constants/all-budgets";
import { getCurrency } from "../../context/user-context";

import { motion } from "framer-motion";

const progressVariants = {
  initial: { scaleX: 0 },
  ending: { scaleX: "100%", transition: { type: "tween", duration: 0.5 } },
};

const ProgressBar = ({ budget }: { budget: IBudgetResponse }) => {
  const currency = getCurrency();
  const percentage = Math.ceil((budget.usedAmount / budget.maxAmount) * 100);
  const { color } = budgetColors.find(
    (_budget) => _budget.name === budget.name
  )!;

  return (
    <>
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
      <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div style={{ width: `${percentage}%`, maxWidth: "100%" }}>
          <motion.div
            variants={progressVariants}
            className="w-full origin-left rounded-full p-1 text-center text-xs font-semibold leading-none text-white"
            style={{ backgroundColor: color }}
          >
            {percentage}%
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
