import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { usePrefetchTransactionsByFilters } from "@/services/transaction-services";

type PaginationBarProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  hasNext: boolean;
  hasPrevious: boolean;
};

const PaginationBar = ({
  currentPage,
  setCurrentPage,
  hasNext,
  hasPrevious,
}: PaginationBarProps) => {
  const { prefetchTransactions } = usePrefetchTransactionsByFilters();
  return (
    <div className="mx-auto mb-16 flex w-20 items-center midsm:mb-0">
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

export default PaginationBar;
