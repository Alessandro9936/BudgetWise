import { BiChevronLeftCircle, BiChevronRight } from "react-icons/bi";
import { usePrefetchTransactionsByFilters } from "../../../../../services/transaction-services";

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
  const { prefetchTransactions } = usePrefetchTransactionsByFilters();
  return (
    <div className="mx-auto flex w-20 items-center">
      <button
        disabled={!hasPrevious}
        className="disabled:pointer-events-none disabled:opacity-0"
        onClick={() => setCurrentPage((prev) => (prev >= 1 ? prev - 1 : 1))}
      >
        <BiChevronLeftCircle
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

export default PaginationBar;
