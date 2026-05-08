import Collapse from "@/components/Collapse";
import { map } from "lodash";

type Props = {
  data?: {
    heading?: string;
    content?: string;
  }[];
};
export default function Summary({ data = [] }: Props) {
  if (!data) return null;

  return (
    <div className="p-3 bg-white shadow-Shadow/sm rounded-xl">
      {map(data, (item, index) => (
        <Collapse key={index} content={item?.content} heading={item?.heading} />
      ))}
    </div>
  );
}
