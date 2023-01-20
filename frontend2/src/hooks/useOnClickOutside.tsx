import React, { useEffect } from "react";

interface IOnClickoutside<T> {
  ref: React.RefObject<T>;
  handler: () => void;
}

const useOnClickOutside = <T extends Element>({
  ref,
  handler,
}: IOnClickoutside<T>) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
};

export default useOnClickOutside;
