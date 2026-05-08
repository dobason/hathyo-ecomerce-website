"use client";
import { get, map, slice } from "lodash";
import PostCard from "@/components/PostCard";
import { Post } from "@/types/post";

export default function ClientArrivals({ data }: { data: any }) {
  return (
    <div className="mx-6">
      <div className="xl:grid xl:grid-rows-3 xl:grid-flow-col xl:grid-cols-7 xl:gap-4 xl:gap-8 xl:max-h-[560px]">
        <PostCard
          className={"xl:row-span-3 xl:col-span-4 bg-white"}
          type="image"
          data={get(data, "0")}
        />
        {map(slice(data, 1, 4), (item: Post, index: number) => (
          <PostCard
            key={index}
            className="xl:mt-0 mt-6 xl:col-span-3 bg-white "
            type="card"
            data={item}
          />
        ))}
      </div>
    </div>
  );
}
