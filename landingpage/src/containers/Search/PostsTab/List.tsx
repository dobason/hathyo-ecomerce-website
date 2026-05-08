"use client";

import PostCard from "@/components/PostCard";

import { isEmpty, map, size } from "lodash";

import { memo, useState } from "react";
import useSWR, { SWRResponse } from "swr";
import Pagination from "@/components/Pagination";
import { getPostsByTopic } from "@/services/client/topic";
import Empty from "@/components/Empty"; // Import the Empty component

function List({ id }: { id: string | number }) {
  const [curPage, setCurPage] = useState(0);

  const { data, isLoading }: SWRResponse = useSWR(
    { id, params: { page: curPage, size: 9 } },
    getPostsByTopic,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (!isLoading && isEmpty(data?.posts)) {
    return <Empty />;
  }

  return (
    <div className="py-8">
      <div className="md:container m-auto">
        <div
          className={`xl:grid xl:grid-rows-${
            size(data?.posts) > 3 ? 2 : 1
          } xl:grid-cols-3 xl:gap-4 xl:gap-8 m-6`}
        >
          {map(data?.posts, (item, index) => (
            <PostCard
              key={index}
              className={!index ? "bg-white" : "mt-6 xl:mt-0 bg-white"}
              data={item as any}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <Pagination
          totalPages={data?.totalPages}
          currentPage={data?.currentPage}
          setCurPage={setCurPage}
        />
      </div>
    </div>
  );
}

export default memo(List);
