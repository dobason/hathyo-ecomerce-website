// @ts-ignore
/* eslint-disable */

declare namespace API {
  type PageContentParams = {
    current?: number;
    pageSize?: number;
    page?: number;
    size?: number;
    createdTo?: string;
    createdFrom?: string;
  };

  type Content = {
    code: string;
    title: string;
    description: string;
    attachment?: string; // kiểu string
  };

  type ContentsResult = {
    current?: number;
    pageSize?: number;
    totalElements?: number;
    contentResponses?: Content[];
  };

  type ContentFormValue = {
    code?: string;
    title?: string;
    description?: string;
    attachment?: string; // kiểu string
  };

  type PatchStatusValue = {
    id: string;
    rejectionReason?: string;
    status?: string;
  };

  type UploadResult = {
    links: {
      permalink: string;
      thumbnail: string;
    };
  };
}
