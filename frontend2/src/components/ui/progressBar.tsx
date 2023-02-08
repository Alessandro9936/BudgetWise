import { IBudgetResponse } from "../../services/budget-services";

import { getBudgetUI } from "../../utils/getBudgetUI";
import { getCurrency } from "../../context/userContext";
import { motion } from "framer-motion";

const progressVariants = {
  initial: { scaleX: 0 },
  ending: { scaleX: "100%", transition: { type: "tween", duration: 0.75 } },
};

const ProgressBar = ({ budget }: { budget: IBudgetResponse }) => {
  const currency = getCurrency();

  const percentage = Math.ceil((budget.usedAmount / budget.maxAmount) * 100);

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
            width: `${percentage}%`,
            maxWidth: "100%",
            backgroundColor: budgetColor,
          }}
          variants={progressVariants}
          className="block origin-left rounded-full p-1 text-center text-xs font-semibold leading-none text-white"
        >
          {percentage}%
        </motion.span>
      </div>
    </div>
  );
};

export default ProgressBar;
