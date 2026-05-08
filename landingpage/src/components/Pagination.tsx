"use client";
import React from "react";
import ArrowRight from "./Icons/ArrowRight";
import ArrowLeft from "./Icons/ArrowLeft";
import { range } from "lodash";

type Props = {
  currentPage: number;
  totalPages: number;
  setCurPage: any;
};

function Pagination({ currentPage, totalPages, setCurPage }: Props) {
  const active =
    "flex items-center justify-center px-3 h-8 ms-0 font-medium text-xl bg-Moss/400 text-white hover:bg-Moss/200 rounded-md hover:text-white ";
  const normal =
    "flex items-center justify-center px-3 h-8 ms-0 font-medium text-xl text-Grayiron/400 hover:bg-Moss/200 hover:rounded-md hover:text-white ";

  const onLeftClick = () => {
    if (currentPage === 0) return;
    setCurPage(currentPage - 1);
  };

  const onRightClick = () => {
    if (currentPage === totalPages - 1) return;
    setCurPage(currentPage + 1);
  };

  if (totalPages <= 1) {
    return;
  }

  return (
    <ul className="cursor-pointer inline-flex -space-x-px text-sm gap-2">
      <li onClick={onLeftClick}>
        <span className="flex items-center justify-center px-3 h-8 ms-0 font-medium text-xl text-Grayiron/400 hover:bg-Moss/200 hover:rounded-md hover:text-white ">
          <ArrowLeft />
        </span>
      </li>
      {range(0, totalPages)?.map((index) => (
        <li onClick={() => setCurPage(index)} key={index}>
          <span className={currentPage === index ? active : normal}>
            {index + 1}
          </span>
        </li>
      ))}
      <li onClick={onRightClick}>
        <span className="flex items-center justify-center px-3 h-8 ms-0 font-medium text-xl text-Grayiron/400 hover:bg-Moss/200 hover:rounded-md hover:text-white ">
          <ArrowRight />
        </span>
      </li>
    </ul>
  );
}

export default Pagination;
