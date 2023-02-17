import { ReactNode } from "react";
import ReactDOM from "react-dom";
import Card from "@/components/wrapper/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/utils/reusableVariants";

const Modal = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  return (
    <>
      {ReactDOM.createPortal(
        <>
          <div
            className="fixed top-0 bottom-0 left-0 right-0 z-20 bg-[rgba(0,0,0,0.7)]"
            onClick={() => navigate("..")}
          />

          <motion.div
            variants={fadeInVariants}
            initial="initial"
            animate="ending"
            transition={{ duration: 0.25 }}
            className="fixed z-50 h-fit w-fit"
          >
            <Card classNames="dark:bg-slate-800 w-11/12 min-w-[300px] midsm:w-9/12 lg:w-1/2 xl:w-4/12 fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 max-h-[98%] overflow-auto scrollbar-vertical">
              {children}
            </Card>
          </motion.div>
        </>,
        document.getElementById("portal")!
      )}
    </>
  );
};
export default Modal;
