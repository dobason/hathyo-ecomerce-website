// import { getHomePageData } from "@/services/serverServices";
import { Metadata } from "next";

import PostList from "@/containers/Topic/PostList";
import { getTopics } from "@/services/server/topic";
import TopicCollapse from "@/containers/Topic/TopicCollapse";
// import TopicsList from "@/containers/Home/Container/TopicsList";

export default async function Page({ params: { id = "" } }) {
  // const { blocks, SEO } = homepageData;
  const { topics } = await getTopics();

  return (
    <main>
      <div className="container m-auto">
        <div className="flex xl:flex-row flex-col justify-center xl:gap-8 gap-4 xl:py-8 py-4">
          <div className="h-max xl:w-3/12 w-full flex xl:flex-col rounded-xl bg-white justify-between xl:justify-start">
            <TopicCollapse topics={topics} />
          </div>
          <div className="xl:w-9/12 w-full">
            <PostList id={id} />
          </div>
        </div>
      </div>
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Hathyo cùng bạn vui khỏe hơn! - Chủ đề bài viết",
    description:
      "Cùng vui mua sắm, Bán hàng vui khỏe, Quà tặng cuộc sống, Trẻ đẹp hơn mỗi ngày, Lành mạnh và khoa học hơn",
    keywords: [
      "Cùng vui mua sắm",
      "Bán hàng vui khỏe",
      "Quà tặng cuộc sống",
      "Trẻ đẹp hơn mỗi ngày",
      "Lành mạnh và khoa học hơn",
      "Vui khỏe trẻ đẹp hơn",
      "Vì một Việt Nam mạnh mẽ hơn",
    ],
  };
}
