// @ts-ignore
/* eslint-disable */

declare namespace API {
  type ProductsPageParams = {
    current?: number;
    pageSize?: number;
    page?: number;
    size?: number;
    q?: string;
    type?: string;
    topic?: string;
    createdTo?: string;
    createdFrom?: string;
    categoryId?: string;
    shopCategoryId?: string;
    status?: string;
  };

  type indexOfContent = {
    heading: string;
    content: string;
  };

  type ProductResult = {
    current?: number;
    pageSize?: number;
    totalElements?: number;
    products: Product[];
  };

  type ProductStatistics = {
    totalProducts: number;
    newProducts: number;
    draftProducts: number;
    approvedProducts: number;
    rejectedProducts: number;
    pendingProducts: number;
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
    note?: string;
    status?: string;
  };

  type UploadResult = {
    links: {
      permalink: string;
      thumbnail: string;
    };
  };

  type TagItem = { id: number; name: string };

  type ProductSearch = {
    q: string;
    shopCategoryId: string;
    type: string;
    topic: string;
    time: any[];
    status: string;
    categoryId: string;
  };

  type Product = {
    id: string | number;
    productCode?: string;
    shopCategoryId?: number;
    title?: string;
    parentId?: string;
    price?: number;
    anchoPrice?: number;
    shortDescription?: string;
    fullDescription?: string;
    brandName?: string;
    unit?: string;
    placeOfOrigin?: string;
    childrenUnit?: string;
    status?: string;
    numberOfChildrenUnit?: number;
    mainImageUrl?: [file] | string;
    otherImageUrls?: string[];
    variants?: Variant[];
    attributes?: Attribute[];
    mainAttribute?: Attribute;
    secondAttribute?: Attribute;
    productVariants?: Variant[];
    createdAt?: string;
  };

  interface AttributeValue {
    id?: number | null;
    value: string;
  }

  type Attribute = {
    id?: number;
    name: string;
    name?: string;
    attributeValues: AttributeValue[];
  };

  interface Variant {
    key: string;
    mainAttributeValue: string;
    mainAttributeName: string;
    secondAttributeValue: string;
    secondAttributeName: string;
    mainAttributeId?: number | undefined | null;
    mainAttributeValueId?: nnumber | undefined | null;
    secondAttributeId?: number | undefined | null;
    secondAttributeValueId?: number | undefined | null;
    price: number;
    anchoPrice: number;
    imageUrl?: string | undefined;
  }

  interface MinPriceProps {
    anchoPrice: number;
    price: number;
  }
}
