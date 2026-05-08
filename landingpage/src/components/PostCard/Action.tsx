"use client";
import classNames from "classnames";
import Like from "../Icons/Like";
import Comment from "../Icons/Comment";
import Share from "../Icons/Share";

const Action = ({
  like = 0,
  comment = 0,
  share = 0,
  type = "default",
  opacity = 60,
  className,
}: {
  opacity?: number;
  like?: number;
  comment?: number;
  share?: number;
  className?: string;
  type: "card" | "image" | "default";
}) => {
  return (
    <div
      className={classNames(
        "flex flex-row flex-nowrap items-center",
        className
      )}
    >
      <div className="mr-8">
        <Like
          className="inline-block mr-1"
          fillColor={type === "card" ? "#51525C" : "white"}
        />
        <span
          className={classNames(`text-md opacity-${opacity}`, {
            "text-white": type === "image",
            "text-Grayiron/600": ["card", "default"].includes(type),
          })}
        >
          {like}
        </span>
      </div>
      <div className="mr-8">
        <Comment
          className="inline-block mr-1"
          fillColor={type === "card" ? "#51525C" : "white"}
          strokeColor={type === "card" ? "#51525C" : "white"}
        />
        <span
          className={classNames(`text-md opacity-${opacity}`, {
            "text-white": type === "image",
            "text-Grayiron/600": ["card", "default"].includes(type),
          })}
        >
          {comment}
        </span>
      </div>
      <div className="mr-8">
        <Share
          className="inline-block mr-1"
          strokeColor={type === "card" ? "#51525C" : "white"}
        />
        <span
          className={classNames(`text-md opacity-${opacity}`, {
            "text-white": type === "image",
            "text-Grayiron/600": ["card", "default"].includes(type),
          })}
        >
          {share}
        </span>
      </div>
    </div>
  );
};

export default Action;
