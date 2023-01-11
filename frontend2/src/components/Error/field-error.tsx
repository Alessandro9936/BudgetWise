import { AlertTriangle } from "react-feather";

const FieldError = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center gap-x-1 text-sm text-red-500">
      <AlertTriangle size={14} color={"#ef4444"} />
      <p>{message}</p>
    </div>
  );
};

export default FieldError;
