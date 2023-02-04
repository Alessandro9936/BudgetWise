import React, { createContext, useState } from "react";
import { formatMonth } from "../services/format/date";

interface IParams {
  range?: string[];
  type?: string;
  sort?: string;
  state?: string[];
  budget?: string[];
}

interface IParamsContext {
  params: IParams | null;
  setParams: React.Dispatch<React.SetStateAction<IParams | null>>;
}

export const ParamsContext = createContext<IParamsContext>(
  {} as IParamsContext
);

const initial = {
  range: [formatMonth(new Date())],
  type: "",
  sort: "-date",
  state: [],
  budget: [],
};
export const ParamsProvider = ({ children }: { children: React.ReactNode }) => {
  const [params, setParams] = useState<IParams | null>(initial);

  return (
    <ParamsContext.Provider value={{ params, setParams }}>
      {children}
    </ParamsContext.Provider>
  );
};
