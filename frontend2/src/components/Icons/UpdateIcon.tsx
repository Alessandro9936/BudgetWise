import { Edit } from "react-feather";
import { Link } from "react-router-dom";

const UpdateIcon = ({ redirectLink }: { redirectLink: string }) => {
  return (
    <Link to={redirectLink} style={{ display: "inline-block", height: "18px" }}>
      <Edit size={18} color={"#737373"} cursor={"pointer"} />
    </Link>
  );
};

export default UpdateIcon;
