import { useEffect, useRef } from "react";

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  callback: () => void
) => {
  const ref: any = useRef();

  const isInsidePopup = (element: HTMLElement | null): boolean => {
    while (element) {
      if (
        typeof element.className?.includes === "function" &&
        element.className?.includes("hathyo-popup")
      ) {
        return true;
      }
      element = element.parentElement;
    }
    return false;
  };

  useEffect(() => {
    const handleClick = (event: any) => {
      const target = event.target as HTMLElement;
      if (
        ref.current &&
        !ref.current.contains(target) &&
        !isInsidePopup(target)
      ) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [callback]);

  return ref;
};
