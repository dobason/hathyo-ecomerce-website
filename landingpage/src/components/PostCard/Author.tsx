"use client";
import classNames from "classnames";
import Image from "next/image";

const Author = ({
  avatar,
  author,
  type = "default",
}: {
  avatar: string;
  author: string;
  type: "card" | "image" | "default";
}) => {
  return (
    <div className="flex flex-row flex-nowrap items-center">
      {!!avatar && (
        <Image
          width={28}
          height={28}
          className="object-cover w-[28px] h-[28px] rounded-full mr-1"
          src={avatar || "/logo_icon.svg"}
          alt="author avatar"
        />
      )}
      <span
        className={classNames("text-sm opacity-60", {
          "text-white": type === "image",
          "text-Grayiron/600": ["card", "default"].includes(type),
        })}
      >
        {author}
      </span>
    </div>
  );
};

export default Author;
