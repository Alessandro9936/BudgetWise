import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ParamsContext } from "../../../../../context/ParamsContenxt";

interface IUseContextParams {
  paramName: "type" | "range" | "sort" | "state" | "budget";
  activeValues: string | string[];
}

const useContextParams = ({
  paramName,
  activeValues,
}: IUseContextParams): void => {
  const [searchParams, _] = useSearchParams();
  const { setParams } = useContext(ParamsContext);
  useEffect(() => {
    setParams((prev) => ({ ...prev, [paramName]: activeValues }));
  }, [searchParams.get(paramName)]);
};
export default useContextParams;
