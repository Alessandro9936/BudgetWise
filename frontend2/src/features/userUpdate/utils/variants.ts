export const parentVariants = {
  initial: { opacity: 0 },
  ending: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      duration: 0.25,
      staggerChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      duration: 0.25,
      staggerDirection: -1,
      staggerChildren: 0.15,
    },
  },
};

export const childrenVariants = {
  initial: { opacity: 0, y: 20 },
  ending: { opacity: 1, y: 0, transition: { type: "tween" } },
  exit: {
    opacity: 0,
    y: 20,
    transition: { type: "tween" },
  },
};
