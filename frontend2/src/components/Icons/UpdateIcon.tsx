import { BiEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const UpdateIcon = ({ id }: { id: string }) => {
  return (
    <Link to={id}>
      <BiEditAlt size={20} color={"#a3a3a3"} cursor={"pointer"} />
    </Link>
  );
};

export default UpdateIcon;
