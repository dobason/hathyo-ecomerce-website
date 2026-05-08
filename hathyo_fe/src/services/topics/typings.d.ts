// @ts-ignore
/* eslint-disable */

declare namespace API {
  type TopicResult = {
    topics: Topic[];
  };

  type Topic = {
    id?: number | string;
    topic?: number | string;
    name?: string;
    parentId?: string;
    childTopics?: Topic[];
  };

  type TopicFilter = {
    parent_id?: string;
  };
}
