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
  ending: { opacity: 1, y: 0 },
};

export const budgetPreviewParentVariants = {
  initial: { opacity: 0 },
  ending: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.25,
      when: "beforeChildren",
      staggerChildren: 0.15,
      delay: 0.6,
    },
  },
};

export const budgetPreviewChildrenVariants = {
  initial: { opacity: 0 },
  ending: {
    opacity: 1,
  },
};
