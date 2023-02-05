import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../../../../components/Utilities/card";
import { useGetFilteredTransactions } from "../../../../services/transaction-services";

import PaginationBar from "./components/PaginationBar";
import TransactionPreview from "./components/TransactionPreview";

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
