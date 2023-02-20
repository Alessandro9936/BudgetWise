import ToggleIcon from "@/components/icons/toggleIcon";
import { transitionFadeInVariants } from "@/utils/reusableVariants";

import { motion } from "framer-motion";
import { PuffLoader } from "react-spinners";
import { DropdownTypes } from "../types/types";

type ToggleFieldHeaderProps = {
  fieldValue?: string | number;
  label: DropdownTypes;
  setActive: React.Dispatch<React.SetStateAction<DropdownTypes>>;
  activeDropdown: DropdownTypes;
  isFetching?: boolean;
};

const ToggleFieldHeader = ({
  fieldValue,
  label,
  setActive,
  activeDropdown,
  isFetching,
}: ToggleFieldHeaderProps) => {
  const isActive = activeDropdown === label;

  return (
    <motion.div
      variants={transitionFadeInVariants}
      transition={{ type: "tween" }}
      className="flex cursor-pointer items-center justify-between"
      onClick={() => setActive((prev) => (prev === label ? null : label))}
    >
      <div className="flex items-center gap-2">
        <p className="text-lg font-semibold">{label}</p>
        {isFetching && <PuffLoader color="#6366f1" size={20} />}
      </div>
      <div className="flex cursor-pointer items-center gap-x-1">
        <span className="font-semibold text-neutral-400">{fieldValue}</span>
        <ToggleIcon trigger={isActive} />
      </div>
    </motion.div>
  );
};

export default ToggleFieldHeader;
