import Card from "@/components/wrapper/card";
import { getCurrency } from "@/context/userContext";
import { motion } from "framer-motion";
import { transitionFadeInVariants } from "@/utils/reusableVariants";

type AmountWrapperProps = {
  amount: number;
  label: string;
};
const AmountWrapper = ({ amount, label }: AmountWrapperProps) => {
  const currency = getCurrency();
  const color = {
    Income: "bg-green-400",
    Expenses: "bg-red-400",
    Total: amount > 0 ? "bg-green-400" : "bg-red-400",
  }[label];

  return (
    <motion.div
      variants={transitionFadeInVariants}
      transition={{ type: "tween" }}
    >
      <Card classNames="dark:bg-slate-800 flex-1 flex overflow-hidden">
        <span className={`mr-3 w-2 transition-colors ${color}`} />
        <div className="mr-5 flex-1 py-3">
          <p className="mb-2 font-semibold">{label}</p>
          <div className="my-auto flex h-fit items-center justify-between">
            <p className="text-lg font-semibold md:text-2xl">{amount}</p>
            <span>{currency}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default AmountWrapper;
