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
      className="button-primary w-full"
      onClick={reset}
    >
      Clear
    </button>
  );
};

export default ClearFilterButton;
