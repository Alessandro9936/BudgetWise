import { BiExit } from "react-icons/bi";
import { useLogoutUser } from "@/services/user-services";

const MobileLogout = () => {
  const { logoutUser } = useLogoutUser();
  return (
    <button
      className="flex items-center gap-2 rounded-md border border-indigo-500 px-2 py-1 text-indigo-500"
      onClick={() => logoutUser()}
    >
      <BiExit size={24} className="rotate-180" />
      <p>Logout</p>
    </button>
  );
};

export default MobileLogout;
