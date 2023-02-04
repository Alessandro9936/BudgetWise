export interface IFilter {
  isOpen: boolean;
  setActiveDropdown: React.Dispatch<
    React.SetStateAction<"type" | "date" | "sort" | "state" | "budget" | null>
  >;
}
