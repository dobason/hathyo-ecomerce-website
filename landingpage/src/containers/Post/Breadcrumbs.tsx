import classNames from "classnames";
import Link from "next/link";
import React from "react";

type Props = {
  data?: any;
  className?: string;
};

function Breadcrumbs({ className }: Props) {
  return (
    <div className={classNames("text-base text-Grayiron/500", className)}>
      <Link href="/">Trang chủ</Link> {">"}{" "}
      <Link className=" text-Moss/400" href="/post/24">
        ahiihi
      </Link>
    </div>
  );
}

export default Breadcrumbs;
