import { BiXCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const CloseIcon = () => {
  const navigate = useNavigate();
  return (
    <BiXCircle
      size={24}
      color={"#6366f1"}
      cursor="pointer"
      onClick={() => navigate("..")}
    />
  );
};

export default CloseIcon;
