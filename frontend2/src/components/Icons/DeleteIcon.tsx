import { BiTrashAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const DeleteIcon = ({ id }: { id: string }) => {
  return (
    <Link to={`${id}/delete`}>
      <BiTrashAlt size={20} color={"#a3a3a3"} cursor={"pointer"} />
    </Link>
  );
};

export default DeleteIcon;
