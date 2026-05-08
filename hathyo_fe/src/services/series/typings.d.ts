// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Series = {
    id: number | string;
    title: string;
    content: string;
    posts: API.Post[];
  };

  type SeriesResult = {
    series: [Series] | Array;
    totalElements: number;
    current?: number;
    pageSize?: number;
  };

  type PostOrder = {
    postId: number | string;
    postOrder: number;
  };

  type UpdatePostOrder = {
    id: number | string;
    body: PostOrder[];
  };
}
