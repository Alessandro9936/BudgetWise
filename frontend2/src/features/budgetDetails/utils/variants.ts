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
  ending: { opacity: 1, y: 0, height: "auto", transition: { type: "tween" } },
  exit: {
    opacity: 0,
    y: 20,
    transition: { type: "tween" },
  },
};

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
