import { ChevronLeft, ChevronRight } from "react-feather";
import RedirectLink from "../../../components/Buttons/RedirectLink";
import Card from "../../../components/card";
import {
  ITransaction,
  useGetTransactionsByDate,
} from "../../../services/transaction-services";

const TransactionPreview = ({ transaction }: { transaction: ITransaction }) => {
  const stateBadge = (state: "paid" | "topay" | "upcoming") => {};

  return (
    <li className="flex flex-1 border-collapse items-center border-b border-gray-200">
      <p className="flex-1 grow-[2]">{transaction.description}</p>
      <p className="flex-1">{transaction.type}</p>
      <p className="flex-1">{transaction.date.toLocaleDateString()}</p>
      <p className="flex-1">
        {transaction.amount} {transaction.currency}
      </p>
      <p className="flex-1">
        {transaction.type === "expense"
          ? transaction?.budget!.name.charAt(0).toUpperCase() +
            transaction?.budget!.name.slice(1)
          : ""}
      </p>
      <p className="flex-1">
        {transaction.type === "expense" ? transaction?.state : ""}
      </p>
      <p className="flex-1">
        <RedirectLink redirectRoute="somewhere" label="Edit" />
      </p>
    </li>
  );
};

const PaginationBar = () => {
  return (
    <div className="mx-auto mt-6 flex w-fit items-center">
      <button
        type="button"
        className="w-full rounded-l-xl border bg-white p-3  text-gray-600 hover:bg-gray-100"
      >
        <ChevronLeft size={12} strokeWidth={3} />
      </button>
      <button
        type="button"
        className="w-full border-t border-b bg-white px-4 py-2 font-semibold text-purple-500 hover:bg-gray-100 "
      >
        1
      </button>
      <button
        type="button"
        className="w-full border bg-white px-4 py-2  text-gray-600 hover:bg-gray-100"
      >
        2
      </button>
      <button
        type="button"
        className="w-full border-t border-b bg-white px-4 py-2  text-gray-600 hover:bg-gray-100"
      >
        3
      </button>
      <button
        type="button"
        className="w-full border bg-white px-4 py-2  text-gray-600 hover:bg-gray-100"
      >
        4
      </button>
      <button
        type="button"
        className="w-full rounded-r-xl border-t border-b border-r bg-white p-3  text-gray-600 hover:bg-gray-100"
      >
        <ChevronRight size={12} strokeWidth={3} />
      </button>
    </div>
  );
};

const Transactions = () => {
  const query = useGetTransactionsByDate(new Date(), "Monthly");
  const transactions = query?.data ?? [];

  transactions.pop();

  return (
    <Card classNames="flex-1 p-6 flex flex-col">
      <div className="flex items-center border-b border-gray-200 pb-4">
        <p className="flex-1 grow-[2] font-semibold uppercase">Description</p>
        <p className="flex-1 font-semibold uppercase">Type</p>
        <p className="flex-1 font-semibold uppercase">Date</p>
        <p className="flex-1 font-semibold uppercase">Amount</p>
        <p className="flex-1 font-semibold uppercase">Budget</p>
        <p className="flex-1 font-semibold uppercase">State</p>
        <p className="flex-1 font-semibold uppercase"></p>
      </div>
      <ul className="flex flex-1 flex-col">
        {transactions.map((transaction) => (
          <TransactionPreview key={transaction._id} transaction={transaction} />
        ))}
      </ul>
      <PaginationBar />
    </Card>
  );
};
export default Transactions;
