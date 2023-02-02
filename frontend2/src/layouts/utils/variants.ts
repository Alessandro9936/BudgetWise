const sidebarVariants = {
  closed: { width: "fit-content", transition: { type: "tween" } },
  open: {
    width: 260,
    transition: {
      type: "tween",
      duration: 0.25,
      delayChildren: 0.25,
      staggerChildren: 0.15,
    },
  },
};

const itemsVariants = {
  closed: { opacity: 0, y: "-25%", display: "none" },
  open: {
    y: 0,
    opacity: 1,
    display: "block",
    transition: { type: "tween" },
  },
};

export { sidebarVariants, itemsVariants };
