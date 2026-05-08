"use client";
import classNames from "classnames";

const Title = ({
  title,
  type = "default",
  className,
}: {
  title: string | undefined;
  className?: string;
  type: "card" | "image" | "default" | "dark";
}) => {
  return (
    <div
      className={classNames(
        "line-clamp-2",
        {
          "text-Grayiron/600 body-sm-semibold": type === "dark",
          "text-white body-sm-bold": type === "image",
          "text-Moss/500 body-sm-semibold ": ["card", "default"].includes(type),
        },
        className
      )}
    >
      {title}
    </div>
  );
};

export default Title;
