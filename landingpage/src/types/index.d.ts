export interface RequestConfig {
  cache?: RequestCache;
  revalidate?: number;
  id?: number | string;
  tags?: string[];
  params?: any;
  body?: any;
  headers?: any;
  baseUrl?: string;
  method?: "POST" | "PATCH" | "PUT" | "DELETE" | "GET";
}

export interface ProductItem {
  id: number;
  title?: string | undefined;
  mainImageUrl?: string | undefined;
  otherImageUrls?: string[] | undefined;
  rate?: number | undefined;
  price?: number | undefined;
  discountPercent?: number | undefined;
  rating?: number | undefined;
  anchoPrice?: number | undefined;
  className?: string;
  merchantId?: number | undefined;
  mainAttribute?: AttributeResponse;
  secondAttribute?: AttributeResponse;
  brandName?: string | undefined;
  unit?: string | undefined;
  placeOfOrigin?: string | undefined;
  numberOfChildrenUnit?: string | undefined;
  shortDescription?: string | undefined;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productTitle: string;
  productVariantTitle: string;
  productVariantImage: string;
  skuCode: string;
  productPrice: number;
  discountProductPrice: number;
  totalPrice: number;
  quantity: number;
  createdAt: string; // ISO date string
  returned: boolean;
  rated: boolean;
  chooseReturn: boolean;
}

export interface Review {
  id: number;
  userId: string;
  userAvatar: string;
  userName: string;
  productId: number;
  orderItem: OrderItem;
  orderItemId: number;
  rate: number;
  comment: string;
  imageUrls: string;
  createdAt: string;
}

export interface MerchantResponse {
  id: number;
  email: string | null;
  fullName: string | null;
  userId: string | null;
  merchantType: string | null;
  merchantStatus: string | null;
  merchantCode: string | null;
  storeName: string | null;
  logo: string | null;
  city: string | null;
  district: string | null;
  ward: string | null;
  address: string | null;
  phoneNo: string | null;
  identityNumber: string | null;
  identityImageFront: string | null;
  identityImageBack: string | null;
  taxNumber: string | null;
  businessLicense: string | null;
  createdAt: string;
  updatedAt: string | null;
  numOfTotalProducts: number;
  numOfFollowers: number;
  responseRate: number;
  agreed: boolean;
  description: string;
  percentResponseChat: number;
  rating: number;
}

export interface Product {
  id: number;
  shopCategoryId: number;
  merchantId: number;
  productCode: string;
  title: string;
  rating: number;
  rating: number;
  countNumOfOrders: number;
  price: number;
  anchoPrice: number;
  discountPercent: number;
  shortDescription: string;
  fullDescription: string;
  brandName: string;
  unit: string;
  numberOfChildrenUnit: string;
  placeOfOrigin: string;
  mainImageUrl: string;
  otherImageUrls: string[];
  comments: string | null;
  merchant: MerchantResponse | null;
  suggestedProducts: Product[] | null;
  mainAttribute: any; // Change to appropriate type if the structure is known
  secondAttribute: any; // Change to appropriate type if the structure is known
  createdAt: string;
  updatedAt: string;
  status: string;
  rejectionReason: string | null;
}

export interface ProductVariant {
  id: number;
  productId: number;
  mainAttributeId: number;
  mainAttributeValueId: number;
  secondAttributeId: number | null;
  secondAttributeValueId: number | null;
  skuCode: string;
  title: string;
  price: number;
  anchoPrice: number;
  imageUrl: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDetail extends Product {
  mainAttribute: AttributeResponse | null; // Change to appropriate type if the structure is known
  secondAttribute: AttributeResponse | null; // Change to appropriate type if the structure is known
  variants: ProductVariant[];
}
export interface Params {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  shopCategoryId?: string;
  query?: string;
}

// interfaces/APIResponse.ts
export interface ListResponse {
  currentPage: number;
  products: Product[];
  totalElements: number;
  totalPages: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  merchantId: number | null;
  childCategories: Category[];
}

export interface CategoriesResponse {
  categories: Category[];
}

// Define state and action types
export interface UserState {
  users: any[];
  loading: boolean;
  error: string | null;
}

export interface UserAction {
  type: string;
  payload?: any;
}

export interface AppState {
  user: UserState;
  // Add other state types
}

export interface ApiError {
  message: string;
  response: {
    data: {
      message: string;
    };
  };
}
export interface AttributeValueResponse {
  id: number;
  attributeId: number;
  value: string;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface AttributeResponse {
  id: number;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
  attributeValues: AttributeValueResponse[];
}
