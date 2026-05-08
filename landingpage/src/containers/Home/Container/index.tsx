"use client";

import { useState } from "react";
import useSWR from "swr";
import { find } from "lodash";

import Articles from "@/containers/Home/Container/Articles";
import ClientArrivals from "@/containers/Home/Container/ClientArrivals";
import TopicsList from "@/containers/Home/Container/TopicsList";
import Button from "@/components/Button";
import Empty from "@/components/Empty";
import Statistic from "@/components/Icons/Statistic";
import { getHomeData } from "@/services/client/home";

export default function Container() {
  const [since, setSince] = useState("");
  const { data }: { data: any } = useSWR(
    { params: since ? { since } : {} },
    getHomeData,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const postOfFirstTopic = find(data?.data, { topic: "van_dong" });
  const postOfSecondTopic = find(data?.data, { topic: "dinh_duong" });
  const postOfThirdTopic = find(data?.data, { topic: "benh_li" });
  const postOfFourTopic = find(data?.data, { topic: "tinh_than" });

  return (
    <div className="flex flex-col gap-4 xl:gap-8">
      <div className="container m-auto xl:px-6 flex flex-col gap-4 justify-center items-center">
        <h3 className="heading-3 text-Moss/700 xl:text-center">
          Tips hỗ trợ sức khỏe
        </h3>
        <div className="flex flex-row mx-auto xl:mx-6 xl:my-6 w-full justify-center items-center">
          <Button
            size="small"
            className="mr-2"
            icon={
              <Statistic
                strokeColor={since !== "newest" ? "white" : "#70707b"}
              />
            }
            rounded
            onClick={() => setSince("")}
            type={since !== "newest" ? "primary-dark" : "default"}
          >
            Bài viết nổi bật
          </Button>
          <Button
            onClick={() => setSince("newest")}
            size="small"
            rounded
            type={since === "newest" ? "primary-dark" : "default"}
          >
            Bài viết mới nhất
          </Button>
        </div>
      </div>
      <div className="container m-auto">
        {postOfFirstTopic?.posts?.length > 0 ? (
          <Articles data={postOfFirstTopic?.posts} />
        ) : (
          <Empty />
        )}
      </div>
      <div className="bg-Moss/50 py-8">
        <div className="container m-auto flex flex-col gap-4">
          <ClientArrivals data={postOfSecondTopic?.posts} />
          <TopicsList
            data={[postOfThirdTopic, postOfFourTopic].filter(
              (t) => t?.posts?.length > 0
            )}
          />
        </div>
      </div>
    </div>
  );
}
