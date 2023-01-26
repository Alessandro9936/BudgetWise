import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import RedirectLink from "../../../components/Buttons/RedirectLink";
import Card from "../../../components/Utilities/card";
import { getCurrency } from "../../../context/user-context";
import {
  ITransactionResponse,
  useGetFilteredTransactions,
} from "../../../services/transaction-services";

import { motion } from "framer-motion";
import budgets from "../../../constants/all-budgets";

const TransactionPreview = ({
  transaction,
}: {
  transaction: ITransactionResponse;
}) => {
  const currency = getCurrency();
  const budgetView = budgets.find(
    (_budget) => _budget.name === transaction.budget?.name
  );

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-1 items-center border-b border-neutral-200 last-of-type:border-none  dark:border-slate-600"
    >
      <p className="flex-1 grow-[2]">{transaction.description}</p>
      <p className="flex-1">{transaction.type}</p>
      <p className="flex-1">{transaction.date.toLocaleDateString()}</p>
      <p className="flex-1">
        {transaction.amount} {currency}
      </p>
      <p className="flex-1">{budgetView?.label}</p>
      <div className="flex-1">
        <p
          className={`w-fit rounded-full py-1 px-3 text-sm font-semibold
          ${
            transaction.state === "paid"
              ? "bg-green-200 text-green-900"
              : transaction.state === "upcoming"
              ? "bg-yellow-200 text-yellow-900"
              : transaction.state === "topay"
              ? "bg-red-200 text-red-900"
              : ""
          }`}
        >
          {transaction.state || ""}
        </p>
      </div>
      <p className="flex-1">
        <RedirectLink
          redirectTo={`transaction/${transaction._id}`}
          label="Edit"
        />
      </p>
    </motion.li>
  );
};

interface IPaginationBar {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  hasNext: boolean;
  hasPrevious: boolean;
}

const PaginationBar = ({
  currentPage,
  setCurrentPage,
  hasNext,
  hasPrevious,
}: IPaginationBar) => {
  return (
    <div className="mx-auto flex w-20 items-center">
      <button
        disabled={!hasPrevious}
        className="disabled:pointer-events-none disabled:opacity-0"
        onClick={() => setCurrentPage((prev) => (prev >= 1 ? prev - 1 : 1))}
      >
        <BiChevronLeft size={22} className="text-indigo-500" />
      </button>

      <p className="w-full px-4 font-semibold text-indigo-500">{currentPage}</p>

      <button
        disabled={!hasNext}
        className="disabled:pointer-events-none disabled:opacity-0"
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        <BiChevronRight size={22} className="text-indigo-500" />
      </button>
    </div>
  );
};

const Transactions = () => {
  const [searchParams, _] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const query = useGetFilteredTransactions(currentPage);
  const isLoading = query.isLoading;

  const transactions = query?.data ?? [];

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams.toString()]);

  return (
    <>
      <Card classNames="dark:bg-slate-800 flex-1 p-6 pb-0 flex flex-col overlay-x">
        <div className="flex min-w-[876px] items-center border-b border-neutral-200 pb-4 dark:border-slate-600">
          <p className="flex-1 grow-[2] font-semibold uppercase">Description</p>
          <p className="flex-1 font-semibold uppercase">Type</p>
          <p className="flex-1 font-semibold uppercase">Date</p>
          <p className="flex-1 font-semibold uppercase">Amount</p>
          <p className="flex-1 font-semibold uppercase">Budget</p>
          <p className="flex-1 font-semibold uppercase">State</p>
          <p className="flex-1 font-semibold uppercase"></p>
        </div>
        <ul className="flex min-w-[876px] flex-1 flex-col overflow-x-scroll lg:overflow-x-hidden">
          {isLoading ? (
            <h3 className="mt-4">Loading...</h3>
          ) : transactions.length >= 1 ? (
            transactions.map((transaction) => (
              <TransactionPreview
                key={transaction._id}
                transaction={transaction}
              />
            ))
          ) : (
            <p className="mt-6">No transactions available</p>
          )}
        </ul>
      </Card>
      <PaginationBar
        hasNext={transactions.length >= 10}
        hasPrevious={currentPage > 1}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};
export default Transactions;
