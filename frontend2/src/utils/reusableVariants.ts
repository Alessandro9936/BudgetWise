const parentVariants = {
  initial: { opacity: 0 },
  ending: (custom: any) => ({
    opacity: 1,
    transition: {
      duration: 0.25,
      when: "beforeChildren",
      staggerChildren: custom,
    },
  }),
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

const fadeInVariants = {
  initial: { opacity: 0 },
  ending: { opacity: 1 },
};

const transitionFadeInVariants = {
  initial: { opacity: 0, y: 20 },
  ending: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 20,
  },
};

const scaleFadeInVariants = {
  initial: { scaleX: 0 },
  ending: {
    scaleX: 1,
    transition: { duration: 0.5, type: "tween", ease: "easeOut" },
  },
};

export {
  parentVariants,
  fadeInVariants,
  transitionFadeInVariants,
  scaleFadeInVariants,
};
