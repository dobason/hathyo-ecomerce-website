import BMIFormCalc from "@/components/BMIFormCalc";
import PostCard from "@/components/PostCard";
import { TOPIC_NAME } from "@/constants/topics";
import { Post } from "@/types/post";

import { get, map, slice } from "lodash";

type PostsInTopicProps = {
  title?: string;
  data?: Post[];
};

const PostsInTopic = ({ title, data }: PostsInTopicProps) => {
  return (
    <div className="flex flex-col gap-4 xl:gap-8">
      {!!title && (
        <h3 className="heading-3 text-Moss/700 font-semibold capitalize">
          {get(TOPIC_NAME, title)}
        </h3>
      )}
      <div className="xl:grid xl:grid-rows-1 xl:grid-flow-col xl:grid-cols-3 xl:gap-4 xl:gap-8">
        {map(slice(data, 0, 3), (item, index) => (
          <PostCard
            key={index}
            className={index === 0 ? "bg-white" : "mt-6 xl:mt-0 bg-white"}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};

export default function TopicsList({ data }: any) {
  return (
    <div className="xl:grid xl:grid-rows-1 grid-flow-col gap-4 xl:gap-8">
      <div className="xl:col-span-5 flex flex-col gap-4">
        {map(data, (item, index) => (
          <PostsInTopic
            key={index}
            title={get(item, "topic")}
            data={get(item, "posts")}
          />
        ))}
      </div>
      <div className="xl:col-span-1 xl:mt-[78px] mt-6 xl:max-w-[400px] mx-auto">
        <BMIFormCalc />
      </div>
    </div>
  );
}
