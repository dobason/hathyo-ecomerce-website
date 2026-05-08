// import Breadcrumbs from "@/containers/Post/Breadcrumbs";
import PostCardContent from "@/containers/Post/PostCardContent";
// import post from "@/utils/post2.json";
import { Metadata } from "next";
import { getPostDetail, getProductRelated } from "@/services/server/post";
import { stripTag } from "@/utils/commonHelper";
import SuggestedProducts from "@/components/SuggestedProducts";
// import Action from "@/components/PostCard/Action";

export default async function Page({ params: { id = "" } }) {
  const postDetail = await getPostDetail({ id });
  const products = await getProductRelated({ id });
  // const { blocks, SEO } = homepageData;

  return (
    <main className="container m-auto py-4 xl:py-8">
      <div className="flex flex-col gap-4">
        <PostCardContent id={id} data={postDetail} />
        {!!products && products?.length > 0 && (
          <SuggestedProducts title="Sản phẩm gợi ý" products={products} />
        )}
      </div>
    </main>
  );
}

export async function generateMetadata({
  params: { id = "" },
}): Promise<Metadata> {
  const postDetail = await getPostDetail({ id });

  return {
    title: `Hathyo cùng bạn vui khỏe hơn! - ${postDetail?.title}`,
    description: stripTag(postDetail?.description) || postDetail?.themeQuestion,
    keywords: [
      "Cùng vui mua sắm",
      "Bán hàng vui khỏe",
      "Quà tặng cuộc sống",
      "Trẻ đẹp hơn mỗi ngày",
      "Lành mạnh và khoa học hơn",
      "Vui khỏe trẻ đẹp hơn",
      "Vì một Việt Nam mạnh mẽ hơn",
    ],
    openGraph: {
      title: `Hathyo cùng bạn vui khỏe hơn! - ${postDetail?.title}`,
      description:
        stripTag(postDetail?.description) || postDetail?.themeQuestion,
      images: postDetail?.thumbnail,
    },
  };
}
