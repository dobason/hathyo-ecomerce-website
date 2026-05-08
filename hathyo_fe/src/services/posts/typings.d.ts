// @ts-ignore
/* eslint-disable */

declare namespace API {
  type PageParams = {
    current?: number;
    pageSize?: number;
    page?: number;
    size?: number;
    q?: string;
    type?: string;
    topic?: string;
    createdTo?: string;
    createdFrom?: string;
  };
  type Post = {
    author: string;
    content: string;
    createdAt: string;
    id: string;
    permalink: string;
    series: API.Series;
    tags: TagItem[];
    thumbnail: string;
    title: string;
    topic: { id: number; name: string };
    updatedAt: string;
    themeQuestion: string;
    visibility: string;
    indexOfContent: indexOfContent[];
    description: string;
    onHomepage: boolean;
  };

  type indexOfContent = {
    heading: string;
    content: string;
  };

  type PostsResult = {
    current?: number;
    pageSize?: number;
    totalElements?: number;
    posts?: [Post];
  };

  type PostFormValue = {
    topic: number;
    title: string;
    series: string | number;
    tags: [string | number];
    fileUpload: [file];
    content: string;
    id?: string;
    permalink?: string;
    thumbnail?: string;
    themeQuestion?: string;
  };

  type PatchStatusValue = {
    id: string;
    rejectionReason?: string;
    status?: string;
    note?: string;
  };

  type UploadResult = {
    links: {
      permalink: string;
      thumbnail: string;
    };
  };

  type TagItem = { id: number; name: string };

  type PostSearch = { q: string; type: string; topic: string; time: any[] };
}
