"use client";
import classNames from "classnames";
import React, { useState } from "react";
import Reduce from "@/components/Icons/Reduce";
import Add from "@/components/Icons/Add";

type Props = {
  heading?: string | undefined;
  content?: React.ReactNode;
  className?: string | undefined;
};

function Collapse({ content, heading, className }: Props) {
  const [visible, setVisible] = useState(false);

  const onToggle = () => setVisible(!visible);

  return (
    <div
      className={classNames(
        "flex flex-row cursor-pointer mt-3 py-3 justify-between",
        className
      )}
    >
      <div className="flex flex-col">
        <div
          className="text-base !text-Moss/600 font-semibold summary-text"
          aria-expanded={visible} // Accessibility improvement
          onClick={onToggle}
        >
          {heading}
        </div>
        <div
          className={classNames("text-md text-Grayiron/600 mt-3", {
            hidden: !visible,
            block: visible,
          })}
        >
          {content} {/* Render content directly */}
        </div>
      </div>
      <div className="mr-5" onClick={onToggle}>
        {visible ? <Reduce /> : <Add />}
      </div>
    </div>
  );
}

export default Collapse;
