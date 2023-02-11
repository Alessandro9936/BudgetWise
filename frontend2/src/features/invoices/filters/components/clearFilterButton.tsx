import { useSearchParams } from "react-router-dom";
import { ParamNames } from "../types/types";

type ClearFilterButtonProps = {
  disabled: boolean;
  paramName: ParamNames;
};

const ClearFilterButton = ({ disabled, paramName }: ClearFilterButtonProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onReset = () => {
    searchParams.delete(paramName);
    setSearchParams(searchParams);
  };

  return (
    <button
      disabled={disabled}
      className="button-primary mt-4 w-full"
      onClick={onReset}
    >
      Clear
    </button>
  );
};

export default ClearFilterButton;
