import React from "react";
import classNames from "classnames";

type Props = {
  children: any;
  suffix?: any;
  href?: string;
  className?: string;
  // close: boolean;
  type?: "primary" | "warning";
};

function Tag({ className, children, type = "primary", suffix, href }: Props) {
  // const [closeable, setCloseable] = useState(close);
  return (
    <a href={href}>
      <span
        className={classNames(
          "px-2 py-1 rounded-full",
          {
            "bg-Moss/50 text-Moss/400 label-normal": type === "primary",
            "bg-Warning/100 text-Warning/500 label-normal": type === "warning",
          },
          className
        )}
      >
        {children} {suffix}
        {/* {Boolean(closeable) && <span></span>} */}
      </span>
    </a>
  );
}

export default Tag;
