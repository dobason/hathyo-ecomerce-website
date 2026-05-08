"use client";
import classNames from "classnames";
import dayjs from "dayjs";
import Tag from "../Tag";

const TagInfo = ({
  topic,
  createdAt = "",
  className,
  type = "default",
  opacity = 60,
}: {
  topic: string;
  opacity?: number;
  createdAt: string;
  className?: string;
  type: "card" | "image" | "default";
}) => {
  return (
    <div
      className={classNames(
        "flex flex-row flex-nowrap items-center gap-2",
        className
      )}
    >
      <Tag type="warning">{topic}</Tag>
      <span
        className={classNames(`text-md opacity-${opacity}`, {
          "text-white": type === "image",
          "text-Grayiron/600": ["card", "default"].includes(type),
        })}
      >
        {dayjs(createdAt)?.fromNow?.()}
      </span>
    </div>
  );
};

export default TagInfo;
