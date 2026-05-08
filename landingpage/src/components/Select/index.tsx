import React, { FC, useState, useRef, useEffect } from "react";
import ArrowDown from "@/components/Icons/ArrowDown";
import classNames from "classnames";

interface Option {
  value: number;
  label: string;
}

interface SelectProps {
  placeholder?: string;
  value?: number | null | undefined;
  onChange?: (value: number) => void;
  options: Option[];
  className?: string;
  disabled?: boolean; // Fixed from 'disable' to 'disabled'
}

const Select: FC<SelectProps> = ({
  placeholder,
  value,
  onChange,
  options,
  className,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<
    number | null | undefined
  >(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync selectedOption with value prop
  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  // Find selected label, fallback to placeholder if no match
  const selectedLabel =
    options.find((item) => item.value === selectedOption)?.label || placeholder;

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionValue: number) => {
    setSelectedOption(optionValue);
    if (onChange) {
      onChange(optionValue); // Safely call onChange if defined
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prevState) => !prevState);
    }
  };

  return (
    <div id="option" className="relative flex w-full" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className={classNames(
          "rounded-lg px-2 py-3 border border-gray-200 flex flex-row justify-between flex-nowrap bg-white w-full text-left items-center",
          {
            [className ?? ""]: !!className,
            "opacity-50 cursor-not-allowed": disabled,
          }
        )}
      >
        <span
          className={classNames("text-md", {
            "text-gray-200": !selectedLabel,
          })}
        >
          {selectedLabel ?? placeholder}
        </span>
        <span
          className={classNames("transform transition text-md", {
            "rotate-180": isOpen,
            "rotate-0": !isOpen,
          })}
        >
          <ArrowDown />
        </span>
      </div>
      {isOpen && !disabled && (
        <ul className="absolute bg-white border border-gray-200 rounded-lg w-full mt-12 left-0 max-h-32 overflow-auto z-50">
          {options.length > 0 ? (
            options.map((option, idx) => (
              <li
                key={idx}
                onClick={() => handleOptionClick(option.value)}
                className={classNames(
                  "p-2 hover:bg-gray-100 cursor-pointer text-md font-normal",
                  {
                    "bg-gray-200": selectedOption === option.value,
                  }
                )}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="p-2 text-md font-normal text-gray-500">
              No options available
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Select;
