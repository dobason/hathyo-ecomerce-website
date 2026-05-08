import classNames from "classnames";
import React from "react";

type Props = {
  title?: string | undefined;
  className?: string;
  value?: boolean;
  onChange?: any | undefined;
};

function Switch({ title, className, value, onChange }: Props) {
  return (
    <label
      className={classNames(
        "inline-flex gap-2 items-center me-5 cursor-pointer",
        className
      )}
    >
      <input
        onChange={onChange}
        checked={value}
        type="checkbox"
        className="sr-only peer"
      />
      <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-Moss/400"></div>
      <span className="text-sm-medium font-medium text-Grayiron/400">
        {title}
      </span>
    </label>
  );
}

export default Switch;
