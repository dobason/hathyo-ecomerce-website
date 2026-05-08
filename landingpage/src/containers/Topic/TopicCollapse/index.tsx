// import { getHomePageData } from "@/services/serverServices";

import Collapse from "./Collapse";
import { map } from "lodash";

export default function TopicCollapse({ topics, activeId, onSetTopic }: any) {
  return map(topics, (item: any, index: number) => (
    <Collapse
      key={index}
      isMain
      currentIndex={index}
      id={item?.id}
      title={item?.name}
      childTopics={item?.childTopics}
      currentId={activeId}
      onSetTopic={onSetTopic}
    />
  ));
}
