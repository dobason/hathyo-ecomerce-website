import React, { useRef } from "react";
import classNames from "classnames";

function Modal({
  children,
  footer,
  header,
  title,
  visible,
  onClose,
  isAuth,
}: {
  onClose: any;
  children: any;
  footer?: any;
  header?: any;
  title?: string;
  visible: boolean;
  isAuth?: boolean;
  // containerRef?: any;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: React.MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  React.useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div onClick={handleClickOutside} className="relative z-50 text-Grayiron/600">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full xl:items-center items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className={classNames(
              "relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ",
              {
                "xl:max-w-lg": !isAuth,
                "xl:max-w-[60vw]": isAuth,
              }
            )}
          >
            <div
              className="relative bg-white xl:px-4 xl:pb-4 xl:pt-5 p-6 sm:p-10 sm:pb-2"
            >
              <div ref={containerRef} onClick={(e) => e.stopPropagation()}>
                <div>{header}</div>
                <h3 className="heading-5">{title}</h3>
                <div>{children}</div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
