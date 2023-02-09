import { BiCheckCircle } from "react-icons/bi";
import { useLocation } from "react-router-dom";

const MessageRedirect = (): JSX.Element => {
  const { state } = useLocation();
  const messageRedirect = state?.message;

  return (
    messageRedirect && (
      <div className="flex items-center gap-1">
        <BiCheckCircle
          className="text-green-500 dark:text-green-400"
          size={22}
        />
        <p className="font-semibold italic text-green-500 dark:text-green-400">
          {messageRedirect}
        </p>
      </div>
    )
  );
};
export default MessageRedirect;
