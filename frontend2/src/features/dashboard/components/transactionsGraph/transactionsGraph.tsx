import TimeSpanButton from "@/components/buttons/timespanButton";
import Card from "@/components/wrapper/card";
import DateBar from "@/components/ui/dateBar";
import useActiveDates from "@/hooks/useActiveDates";
import { useGetTransactionsByDate } from "@/services/transaction-services";
import { BiSync } from "react-icons/bi";
import { motion } from "framer-motion";
import { graphVariants } from "../../utils/variants";
import Graph from "./graph";

const TransactionsGraph = ({
  gridDisposition,
}: {
  gridDisposition: string;
}) => {
  const {
    updateActiveDate,
    updateActiveTimeSpan,
    activeDate,
    activeTimeSpan,
    activeDateFormatted,
    refreshDate,
  } = useActiveDates();

  const queryTransactions = useGetTransactionsByDate(
    activeDate,
    activeTimeSpan
  );
  const transactions = queryTransactions?.data ?? [];

  const isFetching = queryTransactions?.isFetching;

  return (
    <motion.section
      variants={graphVariants}
      initial="initial"
      animate="ending"
      className={`${gridDisposition} flex flex-col gap-y-4 `}
    >
      <div className="flex items-center justify-between">
        <h3>Overview</h3>
        <div className="flex items-center gap-2 ">
          {["Yearly", "Monthly", "Weekly"].map((timeSpan) => (
            <TimeSpanButton
              key={timeSpan}
              timeSpan={timeSpan as "Yearly" | "Monthly" | "Weekly"}
              activeTimeSpan={activeTimeSpan}
              updateActiveTimeSpan={updateActiveTimeSpan}
            />
          ))}
        </div>
      </div>
      <Card classNames="flex-1 p-4 lg:overflow-hidden relative dark:bg-slate-800">
        <div className="flex items-center justify-center gap-1">
          <BiSync size={26} cursor={"pointer"} onClick={refreshDate} />
          <div className="ml-2 w-full md:w-3/4 lg:w-3/5">
            <DateBar
              updateActiveDate={updateActiveDate}
              activeDateFormatted={activeDateFormatted}
              activeDate={activeDate}
              activeTimeSpan={activeTimeSpan}
              toPrefetch="transaction"
            />
          </div>
        </div>

        <Graph
          transactions={transactions}
          isFetching={isFetching}
          activeDate={activeDate}
          activeTimeSpan={activeTimeSpan}
        />
      </Card>
    </motion.section>
  );
};

export default TransactionsGraph;
