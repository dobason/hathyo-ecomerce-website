"use client";
import classNames from "classnames";
import CKContent from "../CKContent";

const Description = ({
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
        "text-md line-clamp-2 my-[6px]",
        {
          "text-Grayiron/600 font-medium": type === "dark",
          "text-white font-medium": type === "image",
          "text-Moss/500 font-medium ": ["card", "default"].includes(type),
        },
        className
      )}
    >
      <CKContent data={title} />
    </div>
  );
};

export default Description;
