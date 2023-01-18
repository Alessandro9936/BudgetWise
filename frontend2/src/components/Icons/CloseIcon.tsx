import { XCircle } from "react-feather";
import { useNavigate } from "react-router-dom";

const CloseIcon = () => {
  const navigate = useNavigate();
  return (
    <XCircle
      size={24}
      strokeWidth={1.5}
      cursor="pointer"
      onClick={() => navigate("..")}
    />
  );
};

export default CloseIcon;
