"use client";

import PostCard from "@/components/PostCard";
import { isEmpty, map, size, slice } from "lodash";
import { memo, useState, useEffect, useRef } from "react";
import useSWR, { SWRResponse } from "swr";
import ArrivalSection from "@/containers/Topic/ArrivalSection";
import Pagination from "@/components/Pagination";
import { getPostsByTopic } from "@/services/client/topic";
import Empty from "@/components/Empty";
import gsap from "gsap";

function PostList({ id }: { id: string | number }) {
  const [curPage, setCurPage] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const arrivalRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading }: SWRResponse = useSWR(
    { id, params: { page: curPage, size: 10 } },
    getPostsByTopic,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const postSection1 = slice(data?.posts, 0, 4);
  const postSection2 = slice(data?.posts, 4, 10);

  // Animation with GSAP
  useEffect(() => {
    if (!isLoading && !isEmpty(data?.posts)) {
      if (arrivalRef.current) {
        gsap.fromTo(
          arrivalRef.current,
          { autoAlpha: 0, y: 50 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
      }

      const cards = cardRef.current?.querySelectorAll(".post-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.2,
          }
        );
      }
    }
  }, [data?.posts, isLoading]);

  if (!isLoading && isEmpty(data?.posts)) {
    return <Empty />;
  }

  if (postSection1.length < 4) {
    return (
      <div className="md:container m-auto" ref={arrivalRef}>
        <ArrivalSection data={postSection1} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="md:container m-auto xl:flex xl:flex-col xl:gap-4">
        <div ref={arrivalRef}>
          <ArrivalSection data={postSection1} />
        </div>
        <div
          ref={cardRef}
          className={`xl:grid xl:grid-rows-${
            size(postSection2) > 3 ? 2 : 1
          } xl:grid-cols-3 xl:gap-4 xl:gap-8`}
        >
          {map(postSection2, (item, index) => (
            <PostCard
              key={index}
              className={`post-card bg-white ${!index ? "" : "mt-6 xl:mt-0"}`}
              data={item as any}
            />
          ))}
        </div>
      </div>
      {!!data.totalPages && data?.totalPages > 1 && (
        <div className="flex flex-row justify-center">
          <Pagination
            totalPages={data?.totalPages}
            currentPage={data?.currentPage}
            setCurPage={setCurPage}
          />
        </div>
      )}
    </div>
  );
}

export default memo(PostList);
