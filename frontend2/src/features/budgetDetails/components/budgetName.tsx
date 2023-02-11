import { getBudgetUI } from "@/utils/getBudgetUI";
import { childrenVariants } from "../utils/variants";

import { motion } from "framer-motion";
import { BudgetResponse } from "@/services/budget-services";

const BudgetName = ({ budget }: { budget: BudgetResponse }) => {
  const BudgetUI = getBudgetUI(budget.name);

  return (
    <motion.div
      variants={childrenVariants}
      className="flex items-center justify-between"
    >
      <p className="font-semibold">Budget type</p>
      <p
        className="rounded-lg border-2 px-2 py-[2px] font-semibold"
        style={{
          borderColor: BudgetUI?.color,
          color: BudgetUI?.color,
        }}
      >
        {BudgetUI?.label}
      </p>
    </motion.div>
  );
};

export default BudgetName;
