import { useSearchParams } from "react-router-dom";

const ClearFilterButton = ({
  filter,
  disabled,
}: {
  filter: string;
  disabled: boolean;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const clearFilter = () => {
    searchParams.delete(filter);
    setSearchParams(searchParams);
  };

  return (
    <button
      disabled={disabled}
      className="mt-2 w-full rounded-lg bg-slate-900 py-2 font-semibold text-white transition-all hover:bg-purple-500 disabled:pointer-events-none disabled:bg-slate-200"
      onClick={clearFilter}
    >
      Clear
    </button>
  );
};

export default ClearFilterButton;
