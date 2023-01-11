import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useSearchParams } from "react-router-dom";
import RedirectLink from "../../../components/Buttons/RedirectLink";
import Card from "../../../components/Utilities/card";
import {
  ITransaction,
  useGetFilteredTransactions,
} from "../../../services/transaction-services";

const TransactionPreview = ({ transaction }: { transaction: ITransaction }) => {
  return (
    <li className="flex flex-1 items-center border-b border-gray-200">
      <p className="flex-1 grow-[2]">{transaction.description}</p>
      <p className="flex-1">{transaction.type}</p>
      <p className="flex-1">{transaction.date.toLocaleDateString()}</p>
      <p className="flex-1">
        {transaction.amount} {transaction.currency}
      </p>
      <p className="flex-1">{transaction.budget?.name || ""}</p>
      <div className="flex-1">
        <p
          className={`w-fit rounded-full py-[2px] px-2 font-semibold
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
        <RedirectLink redirectRoute="somewhere" label="Edit" />
      </p>
    </li>
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
    <div className="mx-auto  flex w-fit items-center">
      {hasPrevious && (
        <button
          onClick={() => setCurrentPage((prev) => (prev >= 1 ? prev - 1 : 1))}
          type="button"
          className="w-full rounded-l-xl border bg-white p-3 text-gray-600 hover:bg-gray-100"
        >
          <ChevronLeft size={12} strokeWidth={3} />
        </button>
      )}

      <button
        type="button"
        className="mx-2 w-full border bg-white px-4 py-2 font-semibold text-purple-500"
      >
        {currentPage}
      </button>

      {hasNext && (
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          type="button"
          className="w-full rounded-r-xl border bg-white p-3  text-gray-600 hover:bg-gray-100"
        >
          <ChevronRight size={12} strokeWidth={3} />
        </button>
      )}
    </div>
  );
};

const Transactions = () => {
  const [searchParams, _] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const query = useGetFilteredTransactions(currentPage);

  const transactions = query?.data ?? [];

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams.toString()]);

  return (
    <>
      <Card classNames="flex-1 p-6 pb-0 flex flex-col overlay-x">
        <div className="flex min-w-[876px] items-center border-b border-gray-200 pb-4">
          <p className="flex-1 grow-[2] font-semibold uppercase">Description</p>
          <p className="flex-1 font-semibold uppercase">Type</p>
          <p className="flex-1 font-semibold uppercase">Date</p>
          <p className="flex-1 font-semibold uppercase">Amount</p>
          <p className="flex-1 font-semibold uppercase">Budget</p>
          <p className="flex-1 font-semibold uppercase">State</p>
          <p className="flex-1 font-semibold uppercase"></p>
        </div>
        <ul className="flex min-w-[876px] flex-1 flex-col overflow-x-scroll lg:overflow-x-hidden">
          {transactions.length >= 1 ? (
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
