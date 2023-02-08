import { ReactNode } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import Card from "../wrapper/card";

import { motion } from "framer-motion";

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="fixed z-50 h-fit w-fit "
          >
            <Card classNames="dark:bg-slate-800 w-11/12 min-w-[300px] midsm:w-8/12 lg:w-1/2 xl:w-4/12 fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4">
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
