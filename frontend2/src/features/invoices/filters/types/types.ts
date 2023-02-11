export type ParamNames = "range" | "type" | "sort" | "state" | "budget";

export type FilterProps = {
  isOpen: boolean;
  setActiveDropdown: React.Dispatch<React.SetStateAction<ParamNames | null>>;
};
