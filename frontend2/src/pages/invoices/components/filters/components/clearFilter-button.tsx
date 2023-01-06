const ClearFilterButton = ({
  disabled,
  reset,
}: {
  disabled: boolean;
  reset: () => void;
}) => {
  return (
    <button
      disabled={disabled}
      className="mt-2 w-full rounded-lg bg-slate-900 py-2 font-semibold text-white transition-all hover:bg-purple-500 disabled:pointer-events-none disabled:bg-slate-200"
      onClick={reset}
    >
      Clear
    </button>
  );
};

export default ClearFilterButton;
