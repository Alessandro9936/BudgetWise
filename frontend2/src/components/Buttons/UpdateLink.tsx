import { Edit } from "react-feather";
import { Link } from "react-router-dom";

const UpdateLink = ({ id }: { id: string }) => {
  return (
    <Link to={id} style={{ display: "inline-block", height: "18px" }}>
      <Edit size={18} color={"#737373"} cursor={"pointer"} />
    </Link>
  );
};

export default UpdateLink;
