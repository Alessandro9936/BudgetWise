import ToggleIcon from "@/components/icons/toggleIcon";
import { childrenVariants } from "../utils/variants";

import { motion } from "framer-motion";
import { DropdownTypes } from "../types/types";

type ToggleFieldHeaderProps = {
  fieldValue?: string | number;
  label: DropdownTypes;
  setActive: React.Dispatch<React.SetStateAction<DropdownTypes>>;
  activeDropdown: DropdownTypes;
};

const ToggleFieldHeader = ({
  fieldValue,
  label,
  setActive,
  activeDropdown,
}: ToggleFieldHeaderProps) => {
  const isActive = activeDropdown === label;

  return (
    <motion.div
      variants={childrenVariants}
      className="flex cursor-pointer items-center justify-between"
      onClick={() => setActive((prev) => (prev === label ? null : label))}
    >
      <p className="text-lg font-semibold">{label}</p>
      <div className="flex cursor-pointer items-center gap-x-1">
        <span className="font-semibold text-neutral-400">{fieldValue}</span>
        <ToggleIcon trigger={isActive} />
      </div>
    </motion.div>
  );
};

export default ToggleFieldHeader;
