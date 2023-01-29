import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";

import { motion } from "framer-motion";

const variants1 = {
  initial: { opacity: 0 },
  ending: {
    opacity: 1,
    transition: {
      duration: 0.25,
      when: "beforeChildren",
    },
  },
};
const variants = {
  initial: { scaleX: 0 },
  ending: {
    scaleX: 1,
    transition: { duration: 0.5, type: "tween", ease: "easeOut" },
  },
};

interface IFormResponse {
  children: React.ReactNode;
}

const FormResponse = ({ children }: IFormResponse) => {
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
      variants={variants1}
      initial="initial"
      animate="ending"
      className="flex overflow-hidden rounded-lg "
    >
      <div className="w-2 bg-green-500" />
      <motion.div
        variants={variants}
        className="flex w-full origin-left bg-green-200"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center  px-4"
        >
          <BiCheckCircle color="#16a34a" size={34} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-1 flex-col  py-2 "
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
