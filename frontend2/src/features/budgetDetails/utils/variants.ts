export const cardVariants = {
  initial: { opacity: 0, y: 20, height: 0, marginTop: 0 },
  ending: {
    opacity: 1,
    y: 0,
    height: "auto",
    marginTop: "8px",
    transition: { type: "tween" },
  },
  exit: {
    opacity: 0,
    y: 20,
    marginTop: 0,
    height: 0,
    transition: { type: "tween" },
  },
};
