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
      className="button-primary mt-4 w-full"
      onClick={reset}
    >
      Clear
    </button>
  );
};

export default ClearFilterButton;
