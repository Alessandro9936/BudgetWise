import React from "react";
import { PulseLoader } from "react-spinners";

type SubmitButtonType = {
  isLoading: boolean;
  label: string;
};

const SubmitButton = ({ isLoading, label }: SubmitButtonType) => {
  return (
    <button
      disabled={isLoading}
      type="submit"
      className="text mt-2 flex-1 rounded-lg bg-slate-900 py-3 font-semibold text-white transition hover:bg-purple-500 disabled:pointer-events-none disabled:bg-slate-200"
    >
      {!isLoading ? label : <PulseLoader size={8} color="#0f172a" />}
    </button>
  );
};

export default SubmitButton;
