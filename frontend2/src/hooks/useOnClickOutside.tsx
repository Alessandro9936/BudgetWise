import { useEffect, useRef } from "react";

const useOutsideClick = <T extends Element>(callback: () => void) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // Execute callback function only when anything outside of ref is clicked, not when the ref itself gets clicked
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [ref]);

  return ref;
};

export default useOutsideClick;
