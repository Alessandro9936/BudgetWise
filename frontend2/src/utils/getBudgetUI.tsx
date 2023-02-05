import {
  BiBookContent,
  BiCookie,
  BiDumbbell,
  BiEnvelope,
  BiHomeAlt,
  BiJoystick,
  BiLandscape,
  BiShoppingBag,
  BiSpa,
  BiTaxi,
  BiWallet,
} from "react-icons/bi";

export const budgets = [
  {
    name: "rent",
    label: "Rent",
    color: "#ff595e",
    icon: (
      <div className="flex h-fit items-center justify-center rounded-full bg-[rgba(255,89,95,0.25)] p-2">
        <BiHomeAlt size={24} color={"rgba(255,89,95,0.7)"} />
      </div>
    ),
  },
  {
    name: "groceries",
    label: "Groceries",
    color: "#ff924c",
    icon: (
      <div className="flex h-fit items-center justify-center rounded-full  bg-[rgba(255,145,76,0.25)] p-2">
        <BiCookie size={24} color={"rgba(255,145,76,0.7)"} />
      </div>
    ),
  },
  {
    name: "bills",
    label: "Bills",
    color: "#ffca3a",
    icon: (
      <div className="flex h-fit items-center justify-center rounded-full  bg-[rgba(255,202,58,0.25)] p-2">
        <BiWallet size={24} color={"rgba(255,202,58,0.7)"} />
      </div>
    ),
  },
  {
    name: "education",
    label: "Education",
    color: "#c5ca30",
    icon: (
      <div className="flex h-fit items-center justify-center rounded-full  bg-[rgba(197,202,48,0.25)] p-2">
        <BiBookContent size={24} color={"rgba(197,202,48,0.7)"} />
      </div>
    ),
  },
  {
    name: "health&fitness",
    label: "Health & Fitness",
    color: "#8ac926",
    icon: (
      <div className="flex h-fit items-center justify-center rounded-full  bg-[rgba(138,201,38,0.25)] p-2">
        <BiDumbbell size={24} color={"rgba(138,201,38,0.7)"} />
      </div>
    ),
  },
  {
    name: "personalcare",
    label: "Personal care",
    color: "#238d00",
    icon: (
      <div className="flex h-fit items-center justify-center rounded-full  bg-[rgba(35,141,0,0.25)] p-2">
        <BiSpa size={24} color={"rgba(35,141,0,0.7)"} />
      </div>
    ),
  },
  {
    name: "shopping",
    label: "Shopping",
    color: "#36949d",
    icon: (
      <div className="flex h-fit items-center justify-center rounded-full  bg-[rgba(54,148,157,0.25)] p-2">
        <BiShoppingBag size={24} color={"rgba(54,148,157,0.7)"} />
      </div>
    ),
  },
  {
    name: "entertainment",
    label: "Entertainment",
    color: "#1982c4",
    icon: (
      <div className="flex h-fit items-center justify-center rounded-full  bg-[rgba(25,131,196,0.25)] p-2">
        <BiJoystick size={24} color={"rgba(25,131,196,0.7)"} />
      </div>
    ),
  },
  {
    name: "travelling",
    label: "Travelling",
    color: "#4267ac",
    icon: (
      <div className="flex h-fit items-center justify-center rounded-full  bg-[rgba(66,103,172,0.25)] p-2">
        <BiLandscape size={24} color={"rgba(66,103,172,0.7)"} />
      </div>
    ),
  },
  {
    name: "others",
    label: "Others",
    color: "#565aa0",
    icon: (
      <div className="flex h-fit items-center justify-center rounded-full  bg-[rgba(86,90,160,0.25)] p-2">
        <BiEnvelope size={24} color={"rgba(86,90,160,0.7)"} />
      </div>
    ),
  },
  {
    name: "transport",
    label: "Transport",
    color: "#6a4c93",
    icon: (
      <div className="flex h-fit items-center justify-center rounded-full  bg-[rgba(105,76,147,0.25)] p-2">
        <BiTaxi size={24} color={"rgba(105,76,147,0.7)"} />
      </div>
    ),
  },
];

export const getBudgetUI = (compareBudget: string) => {
  return budgets.find((_budgetUI) => _budgetUI.name === compareBudget);
};
