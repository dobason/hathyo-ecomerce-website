import React, { useState } from "react";
import ArrowUp from "@/components/Icons/ArrowUp";
import ArrowDown from "@/components/Icons/ArrowDown";
import classNames from "classnames";

type Props = {
  content?: string;
  heading?: string;
  className?: string;
};

function CollapseButton({ heading, className, content }: Props) {
  const [visible, setVisible] = useState(false);

  const onToggle = () => setVisible(!visible);

  return (
    <>
      <div
        className={classNames(
          "w-[190px] flex flex-row justify-between cursor-pointer items-center px-3 py-2 shadow-Shadow/xs bg-white text-Grayiron/500 border-Grayiron/100 hover:bg-Moss/50 border rounded-lg",
          className
        )}
        onClick={onToggle}
      >
        <div
          className="text-base text-Moss/600"
          dangerouslySetInnerHTML={{ __html: heading || "" }}
        />
        <div
          className={classNames("text-md text-Grayiron/600 mt-3", {
            hidden: !visible,
            block: visible,
          })}
          dangerouslySetInnerHTML={{ __html: content || "" }}
        />
        <div>{visible ? <ArrowUp /> : <ArrowDown />}</div>
      </div>
    </>
  );
}

export default CollapseButton;
