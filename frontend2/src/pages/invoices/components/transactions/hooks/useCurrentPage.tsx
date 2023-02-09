import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useCurrentPage = () => {
  const [searchParams, _] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams.toString()]);

  return { currentPage, setCurrentPage };
};
export default useCurrentPage;
