"use client";
import Image from "next/image";
import React, { useState } from "react";
import ArrowUp from "@/components/Icons/ArrowUp";
import ArrowDown from "@/components/Icons/ArrowDown";

type Props = {
  icon?: string;
  heading?: string | undefined;
  className?: string | undefined;
  childComponent?: JSX.Element;
};

function Collapse({ icon, heading, className, childComponent }: Props) {
  const [visible, setVisible] = useState(false);

  const onToggle = () => setVisible(!visible);

  return (
    <>
      <div
        className={
          "flex flex-row cursor-pointer items-center justify-between p-3 gap-4 " +
          className
        }
        onClick={onToggle}
      >
        <div className="flex flex-row cursor-pointer items-center gap-4">
          {icon && (
            <Image
              src={"/" + icon + ".png"}
              alt={icon}
              width={32}
              height={32}
            />
          )}
          <div className="flex flex-col">
            <div
              className="text-md text-Grayiron/700 font-semibold"
              dangerouslySetInnerHTML={{ __html: heading || "" }}
            />
          </div>
        </div>

        <div>{visible ? <ArrowUp /> : <ArrowDown />}</div>
      </div>
      {!!visible && !!childComponent && (
        <div className="px-3 py-2">{visible && childComponent}</div>
      )}
    </>
  );
}

export default Collapse;
