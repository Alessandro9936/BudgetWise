import { PulseLoader } from "react-spinners";

type SubmitButtonType = {
  isLoading: boolean;
  label: string;
  styles?: string;
};

const SubmitButton = ({ isLoading, label, styles }: SubmitButtonType) => {
  return (
    <button
      disabled={isLoading}
      type="submit"
      className={`text flex-1 rounded-lg bg-slate-900 py-3 font-semibold text-white transition hover:bg-purple-500 disabled:pointer-events-none disabled:bg-slate-200 ${styles}`}
    >
      {!isLoading ? label : <PulseLoader size={8} color="#0f172a" />}
    </button>
  );
};

export default SubmitButton;
