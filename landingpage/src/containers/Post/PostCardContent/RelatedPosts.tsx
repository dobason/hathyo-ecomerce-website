import PostCard from "@/components/PostCard";
import { Post } from "@/types/post";
import { isEmpty, map } from "lodash";

type Props = {
  title: string;
  data?: Post[];
};

export default function RelatedPosts({ data, title }: Props) {
  if (isEmpty(data)) return null;

  return (
    <div className="bg-white p-6 rounded-xl">
      <div className="text-2xl font-bold text-Moss/700 mb-6">{title}</div>
      <div className="grid grid-cols-1 gap-4 xl:gap-8 mt-6">
        {map(data, (item, idx) => (
          <PostCard key={`${item?.id}-${idx}`} type="image" data={item} />
        ))}
      </div>
    </div>
  );
}
