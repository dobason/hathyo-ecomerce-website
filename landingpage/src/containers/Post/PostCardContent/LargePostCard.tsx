"use client";
import Clock from "@/components/Icons/Clock";
import Action from "@/components/PostCard/Action";
import Author from "@/components/PostCard/Author";
import Description from "@/components/PostCard/Description";
import Title from "@/components/PostCard/Title";
import Switch from "@/components/Switch";
import Tag from "@/components/Tag";
import { Post } from "@/types/post";
import classNames from "classnames";
import dayjs from "dayjs";
import { map, slice } from "lodash";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  data?: Post;
  className?: string;
  showRoadmap: boolean;
  setShowRoadmap: React.Dispatch<React.SetStateAction<boolean>>;
};

function LargePostCard({
  data,
  className,
  showRoadmap,
  setShowRoadmap,
}: Props) {
  const onToggle = (e: any) => {
    setShowRoadmap(e.target?.checked);
  };

  return (
    <div>
      <div
        className={classNames(
          "p-3 bg-white shadow-Shadow/md rounded-xl",
          className
        )}
      >
        {/* <Image
          className="w-full h-full max-h-[294px] xl:max-h-[394px]  rounded-lg object-cover"
          src={data?.permalink || ""}
          alt="banner"
          width={500}
          height={250}
        /> */}
        <div className="px-2">
          {/* <Action className="mt-4" type="card" /> */}
          {/* <Title
            type="dark"
            className="!text-3xl mt-4"
            title={data?.themeQuestion}
          />
          <Description type="dark" title={data?.description} /> */}
          <div className="my-4 flex flex-row flex-wrap items-center justify-start md:justify-between">
            <div className="ml-2 md:ml-0 mt-2 sm:mt-0">
              <Author
                avatar={data?.permalink || ""}
                author={data?.author || ""}
                type="card"
              />
            </div>
            <span
              className={classNames(
                "ml-2 mt-2 sm:mt-0 md:ml-0 text-md text-Grayiron/600"
              )}
            >
              <Clock className="mr-2 inline-block" />
              {dayjs(data?.createdAt)?.format?.("DD/MM/YYYY")}
            </span>
            <div className="ml-2 mt-2 sm:mt-0 md:ml-0">
              {map(slice(data?.tags, 0, 2), (item, index) => (
                <Tag key={index} type={index % 2 !== 0 ? "warning" : "primary"}>
                  {item?.name}
                </Tag>
              ))}
            </div>
            <Switch
              className="ml-2 md:ml-0 mt-2 md:mt-0"
              value={showRoadmap}
              onChange={onToggle}
              title="Xem ở dạng Roadmap"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LargePostCard;
