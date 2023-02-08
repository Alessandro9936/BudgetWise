import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";

import { motion } from "framer-motion";

const parentVariants = {
  initial: { opacity: 0 },
  ending: {
    opacity: 1,
    transition: {
      duration: 0.25,
      when: "beforeChildren",
    },
  },
};
const childrenVariants = {
  initial: { scaleX: 0 },
  ending: {
    scaleX: 1,
    transition: { duration: 0.5, type: "tween", ease: "easeOut" },
  },
};
const subChildrenVariants = {
  initial: { opacity: 0 },
  ending: { opacity: 1, delay: 0.8 },
};

const FormResponse = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [secondsToRedirect, setSecondsToRedirect] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsToRedirect((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (secondsToRedirect === 0) {
      navigate("..");
    }
  }, [secondsToRedirect]);

  return (
    <motion.div
      variants={parentVariants}
      initial="initial"
      animate="ending"
      className="flex overflow-hidden rounded-lg "
    >
      <div className="w-2 bg-green-500" />
      <motion.div
        variants={childrenVariants}
        className="flex w-full origin-left bg-green-200"
      >
        <motion.div
          variants={subChildrenVariants}
          className="flex items-center  px-4"
        >
          <BiCheckCircle color="#16a34a" size={34} />
        </motion.div>
        <motion.div
          variants={subChildrenVariants}
          className="flex flex-1 flex-col py-2 "
        >
          {children}
          <p className="text-sm dark:text-slate-800">
            You'll be redirected in {secondsToRedirect}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FormResponse;
