import { BiErrorCircle } from "react-icons/bi";

const FieldError = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center gap-x-1 text-sm text-red-400">
      <BiErrorCircle size={18} color={"#f87171"} />
      <p>{message}</p>
    </div>
  );
};

export default FieldError;
