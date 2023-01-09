import { Edit, Trash2 } from "react-feather";
import { Link } from "react-router-dom";

const DeleteLink = ({ id }: { id: string }) => {
  return (
    <Link
      to={`${id}/delete`}
      style={{ display: "inline-block", height: "18px" }}
    >
      <Trash2 size={18} color={"#737373"} cursor={"pointer"} />
    </Link>
  );
};

export default DeleteLink;
