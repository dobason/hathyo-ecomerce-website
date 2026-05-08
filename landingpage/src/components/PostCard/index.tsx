"use client";
import { Post } from "@/types/post";
import Image from "@/components/Image";
import React from "react";
import Link from "next/link";
import classNames from "classnames";
import TagInfo from "./TagInfo";
import Title from "./Title";
import Author from "./Author";
import Action from "./Action";

function PostCard({
  type = "default",
  data,
  className,
}: {
  type?: "card" | "image" | "default";
  className?: string;
  data?: Post;
}) {
  if (!data?.id) return null;
  const { id, author, title, topic, thumbnail, createdAt } = data;
  switch (type) {
    case "card":
      return (
        <Link
          className={classNames(
            "flex flex-row gap-4 flex-nowrap rounded-xl px-3 py-3 shadow-Shadow/md cursor-pointer",
            className
          )}
          href={`/post/${id}`}
          suppressHydrationWarning
        >
          <div className="basis-2/5 max-w-full">
            <Image
              className="object-cover w-full h-full rounded-xl aspect-[167/148]"
              width={167}
              height={148}
              src={thumbnail}
              alt={title}
            />
          </div>
          <div className="flex flex-col gap-2 basis-3/5">
            <TagInfo type="card" topic={topic?.name} createdAt={createdAt} />
            <Title type="card" title={title} />
            <Author type="card" avatar={thumbnail} author={author} />
            <Action type="card" />
          </div>
        </Link>
      );
    case "image":
      return (
        <Link
          href={`/post/${id}`}
          className={classNames(
            "relative min min-w-[260px] max-w-full min-h-[240px] max-h-full cursor-pointer",
            className
          )}
          suppressHydrationWarning
        >
          <Image
            className="object-cover w-full h-full rounded-xl aspect-[290/270]"
            width={580}
            height={540}
            src={thumbnail}
            alt={title}
          />
          <div className="absolute bottom-0 flex flex-col gap-2 p-3 pt-5 w-full bg-gradient-to-t from-gray-600/[0.9] to-gray-200/[0] rounded-xl">
            <TagInfo type="image" topic={topic?.name} createdAt={createdAt} />
            <Title type="image" title={title} />
            <Author type="image" avatar={thumbnail} author={author} />
          </div>
        </Link>
      );

    default:
      return (
        <Link
          href={`/post/${id}`}
          className={classNames(
            "flex flex-col rounded-xl px-3 py-3 shadow-Shadow/md cursor-pointer",
            className
          )}
          suppressHydrationWarning
        >
          <div className="aspect-[208/188] basis-2/5 max-w-full max-h-[188px]">
            <Image
              className="object-cover w-full h-full rounded-xl"
              width={208}
              height={188}
              src={thumbnail}
              alt={title}
            />
          </div>
          <div className="flex flex-col gap-2 basis-3/5 mt-3">
            <TagInfo type="card" topic={topic?.name} createdAt={createdAt} />
            <Title type="card" title={title} />
            <Author type="card" avatar={thumbnail} author={author} />
          </div>
        </Link>
      );
  }
}

export default PostCard;
