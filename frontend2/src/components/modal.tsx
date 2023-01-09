import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import Card from "./card";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <div
            className="fixed top-0 bottom-0 left-0 right-0 z-20 bg-[rgba(0,0,0,0.7)]"
            onClick={() => navigate("..")}
          />
          <Card classNames="fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 min-w-[400px] z-30">
            {children}
          </Card>
        </>,
        document.getElementById("portal")!
      )}
    </>
  );
};
export default Modal;
