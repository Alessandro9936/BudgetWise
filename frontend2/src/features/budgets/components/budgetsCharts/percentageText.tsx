import { useMemo } from "react";
import { getCurrency } from "@/context/userContext";
import { BudgetResponse } from "@/services/budget-services";

type PercentageTextProps = {
  budgets: BudgetResponse[];
  activeDate: string | number;
};

const PercentageText = ({ budgets, activeDate }: PercentageTextProps) => {
  const currency = getCurrency();

  const totalAmounts = useMemo(
    () =>
      budgets.reduce(
        (acc, cur) => {
          acc.maxAmount += cur.maxAmount;
          acc.usedAmount += cur.usedAmount;
          return acc;
        },
        { usedAmount: 0, maxAmount: 0 }
      ),
    [budgets]
  );

  const percentageSpent = Math.ceil(
    (totalAmounts.usedAmount / totalAmounts.maxAmount) * 100
  );
  const percentageSpentMessage = `In ${activeDate} you spent ${totalAmounts.usedAmount} 
  ${currency} (${percentageSpent}%) of your total budget (${totalAmounts.maxAmount} ${currency})`;

  return (
    <div className="text-center">
      <p className="text-2xl font-bold">{percentageSpent}%</p>
      <p className="text-lg">{percentageSpentMessage}</p>
    </div>
  );
};

export default PercentageText;
