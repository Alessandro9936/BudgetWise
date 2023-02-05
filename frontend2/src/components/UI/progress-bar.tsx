import { IBudgetResponse } from "../../services/budget-services";

import { getBudgetUI } from "../../utils/getBudgetUI";
import { getCurrency } from "../../context/user-context";
import { motion } from "framer-motion";

const progressVariants = {
  initial: { scaleX: 0 },
  ending: { scaleX: "100%", transition: { type: "tween", duration: 0.5 } },
};

const ProgressBar = ({ budget }: { budget: IBudgetResponse }) => {
  const currency = getCurrency();
  const percentage = Math.ceil((budget.usedAmount / budget.maxAmount) * 100);
  const budgetColor = getBudgetUI(budget.name)?.color;

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
      <div className="w-full rounded-full bg-neutral-100 dark:bg-slate-700">
        <motion.div
          style={{
            width: `${percentage}%`,
            maxWidth: "100%",
            backgroundColor: budgetColor,
          }}
          variants={progressVariants}
          className="origin-left rounded-full p-1 text-center text-xs font-semibold leading-none text-white"
        >
          {percentage}%
        </motion.div>
      </div>
    </>
  );
};

export default ProgressBar;
