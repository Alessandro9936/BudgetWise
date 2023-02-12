import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fadeInVariants,
  parentVariants,
  scaleFadeInVariants,
} from "@/utils/reusableVariants";
import { BiCheckCircle } from "react-icons/bi";
import { motion } from "framer-motion";

const FormResponse = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  // Utilize a combination of useEffect and useState hooks to redirect user automatically after the form is submitted
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
        variants={scaleFadeInVariants}
        className="flex w-full origin-left bg-green-200"
      >
        <motion.div
          variants={fadeInVariants}
          transition={{ delay: 0.4 }}
          className="flex items-center  px-4"
        >
          <BiCheckCircle color="#16a34a" size={34} />
        </motion.div>
        <motion.div
          variants={fadeInVariants}
          transition={{ delay: 0.4 }}
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
