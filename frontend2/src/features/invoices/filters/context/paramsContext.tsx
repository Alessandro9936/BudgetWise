import React, { createContext, useState } from "react";
import { formatMonth } from "@/services/format/date";

type ParamsProps = {
  range?: string[];
  type?: string;
  sort?: string;
  state?: string[];
  budget?: string[];
};

interface ParamsContextProps {
  params: ParamsProps | null;
  setParams: React.Dispatch<React.SetStateAction<ParamsProps | null>>;
}

export const ParamsContext = createContext<ParamsContextProps>(
  {} as ParamsContextProps
);

const initial = {
  range: [formatMonth(new Date())],
  type: "",
  sort: "-date",
  state: [],
  budget: [],
};
export const ParamsProvider = ({ children }: { children: React.ReactNode }) => {
  const [params, setParams] = useState<ParamsProps | null>(initial);

  return (
    <ParamsContext.Provider value={{ params, setParams }}>
      {children}
    </ParamsContext.Provider>
  );
};
