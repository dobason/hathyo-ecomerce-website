"use client";

import classNames from "classnames";
import React, { useState } from "react";
import ArrowUp from "./Icons/ArrowUp";
import ArrowDown from "./Icons/ArrowDown";

type Props = {
  heading?: string | undefined;
  content?: string | undefined;
  className?: string | undefined;
};

function Collapse({ content, heading, className }: Props) {
  const [visible, setVisible] = useState(false);

  const onToggle = () => setVisible(!visible);

  return (
    <div
      className={classNames("flex flex-row cursor-pointer py-3 gap-4", {
        [className ?? ""]: !!className,
      })}
    >
      {visible ? <ArrowDown /> : <ArrowUp />}
      <div className="flex flex-1 flex-col">
        <div
          className="body-bold !text-Moss/600 summary-text"
          dangerouslySetInnerHTML={{ __html: heading || "" }}
          onClick={onToggle}
        />
        <div
          className={classNames("body-sm-semibold text-Grayiron/600 mt-3", {
            hidden: !visible,
            block: visible,
          })}
          dangerouslySetInnerHTML={{ __html: content || "" }}
        />
      </div>
    </div>
  );
}

export default Collapse;
