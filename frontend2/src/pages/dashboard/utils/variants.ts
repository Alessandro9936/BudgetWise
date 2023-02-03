export const parentVariants = {
  initial: { opacity: 0 },
  ending: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.25,
      staggerChildren: 0.15,
    },
  },
};

export const childVariants = {
  initial: { opacity: 0, y: 20 },
  ending: { opacity: 1, y: 0, transition: { type: "tween" } },
};

export const popupVariants = {
  initial: { scale: 0, opacity: 0 },
  ending: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
  exit: { scale: 0, opacity: 0, transition: { duration: 0.1 } },
};

export const activityParentVariants = {
  initial: { y: 20, opacity: 0 },
  ending: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1,
      type: "tween",
      duration: 0.25,
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

export const graphVariants = {
  initial: { opacity: 0 },
  ending: { opacity: 1, transition: { delay: 1.5 } },
};
