const states = [
  { name: "paid", label: "Paid", color: "#22c55e" },
  { name: "topay", label: "To pay", color: "#ef4444" },
  { name: "upcoming", label: "Upcoming", color: "#eab308" },
];

export const stateNames = ["paid", "topay", "upcoming"];

export const getStateUI = (compareState: string) => {
  return states.find((stateUI) => stateUI.name === compareState);
};
