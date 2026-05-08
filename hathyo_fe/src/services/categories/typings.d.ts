// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CateResult = {
    categories: Category[];
  };

  type Category = {
    id?: number | string;
    name?: string;
    parentId?: string;
    slug?: string;
    childCategories?: Category[];
  };

  type CateFilter = {
    parent_id?: string;
  };
}
