import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import UpdateIcon from "../../../components/Icons/UpdateIcon";
import Card from "../../../components/Utilities/card";
import { getCurrency } from "../../../context/user-context";
import {
  ITransactionResponse,
  useGetFilteredTransactions,
  usePrefetchTransactionsByFilters,
} from "../../../services/transaction-services";

import { motion } from "framer-motion";
import { getBudgetUI } from "../../../utils/getBudgetUI";

interface ITransactionPreview {
  transaction: ITransactionResponse;
}

interface IPaginationBar {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  hasNext: boolean;
  hasPrevious: boolean;
}

const TransactionPreview = ({ transaction }: ITransactionPreview) => {
  const currency = getCurrency();
  const budgetLabel =
    transaction.type === "expense"
      ? getBudgetUI(transaction.budget!.name)?.label
      : "";
  const transactionTypeLabel =
    transaction.type[0].toUpperCase() + transaction.type.slice(1);
  const transactionAmountLabel = `${
    transaction.type === "expense" ? "- " : "+ "
  } ${transaction.amount} ${currency}`;

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-1 items-center border-b border-neutral-200 last-of-type:border-none  dark:border-slate-600"
    >
      <p className="flex-1 grow-[2]">{transaction.description}</p>
      <p className="flex-1">{transactionTypeLabel}</p>
      <p className="flex-1">
        {transaction.date.toLocaleDateString(navigator.language)}
      </p>
      <p
        className={`flex-1 font-semibold ${
          transaction.type === "income" ? "text-green-400" : "text-red-400"
        }`}
      >
        {transactionAmountLabel}
      </p>
      <p className="flex-1 grow-[1.5]">{budgetLabel}</p>
      <div className="flex-1">
        <p
          className={`w-fit rounded-full py-1 px-3 text-sm font-semibold text-white
          ${
            transaction.state === "paid"
              ? "bg-green-400"
              : transaction.state === "upcoming"
              ? "bg-yellow-400"
              : transaction.state === "topay"
              ? "bg-red-400"
              : ""
          }`}
        >
          {transaction.state || ""}
        </p>
      </div>
      <p className="ml-auto ">
        <UpdateIcon id={`transaction/${transaction._id}`} />
      </p>
    </motion.li>
  );
};

const PaginationBar = ({
  currentPage,
  setCurrentPage,
  hasNext,
  hasPrevious,
}: IPaginationBar) => {
  const { prefetchTransactions } = usePrefetchTransactionsByFilters();
  return (
    <div className="mx-auto flex w-20 items-center">
      <button
        disabled={!hasPrevious}
        className="disabled:pointer-events-none disabled:opacity-0"
        onClick={() => setCurrentPage((prev) => (prev >= 1 ? prev - 1 : 1))}
      >
        <BiChevronLeft
          size={24}
          className="text-indigo-500"
          onMouseOver={() => prefetchTransactions(currentPage - 1)}
        />
      </button>

      <p className="w-full px-4 font-semibold text-indigo-500">{currentPage}</p>

      <button
        disabled={!hasNext}
        className="disabled:pointer-events-none disabled:opacity-0"
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        <BiChevronRight
          size={24}
          className="text-indigo-500"
          onMouseOver={() => prefetchTransactions(currentPage + 1)}
        />
      </button>
    </div>
  );
};

const Transactions = () => {
  const [searchParams, _] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const query = useGetFilteredTransactions(currentPage);
  const transactions = query?.data ?? [];
  const isLoading = query.isLoading;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams.toString()]);

  return (
    <>
      <Card classNames="dark:bg-slate-800 flex-1 p-6 pb-0 flex flex-col overlay-x mb-6 midsm:mb-0">
        <div className="flex min-w-[876px] items-center border-b border-neutral-200 pb-4 dark:border-slate-600">
          <p className="flex-1 grow-[2] font-semibold uppercase">Description</p>
          <p className="flex-1 font-semibold uppercase">Type</p>
          <p className="flex-1 font-semibold uppercase">Date</p>
          <p className="flex-1 font-semibold uppercase">Amount</p>
          <p className="flex-1 grow-[1.5] font-semibold uppercase">Budget</p>
          <p className="mr-6 flex-1 font-semibold uppercase">State</p>
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
            <p className="mt-6 font-semibold">No transactions available</p>
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
