"use client";
import TopicCollapse from "@/containers/Topic/TopicCollapse";
import PostList from "@/containers/Topic/PostList";
import { useParams } from "next/navigation";
import useSWR, { SWRResponse } from "swr";
import { getTopicsClient } from "@/services/client/topic";
import { useEffect, useState } from "react";
// import { Metadata } from "next";

export default function PostTab() {
  const [topics, setTopics] = useState("");

  const { data }: SWRResponse = useSWR({}, getTopicsClient, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    setTopics(data?.topics[0].id);
  }, [data]);

  return (
    <div className="container m-auto">
      <div className="flex xl:flex-row flex-col justify-center ">
        <div className="h-max xl:w-[300px] w-[calc(100%-48px)] my-8 mx-6 rounded-xl bg-white">
          <TopicCollapse
            onSetTopic={setTopics}
            topics={data?.topics}
            activeId={topics}
          />
        </div>
        <div className="xl:w-[calc(100%-280px] w-full ">
          <PostList id={topics as string} />
        </div>
      </div>
    </div>
  );
}
