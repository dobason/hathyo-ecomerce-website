export interface ICartItem {
  productId?: number | undefined;
  merchantId?: number | undefined;
  mainAttributeId?: number | undefined;
  secondAttributeId?: number | undefined;
  mainAttributeValueId?: number | undefined;
  secondAttributeValueId?: number | undefined;
  quantity: number;
  choose?: boolean;
  name?: string;
  cartItemId?: number;
}

// src/types/api-responses.ts
export interface CartApiResponse {
  data: ICartItem[];
}

export interface ApiError {
  message: string;
  response: {
    data: {
      message: string;
    };
  };
}

export interface CartType {
  id: number;
  userId?: 0;
  merchantId: number;
  merchant: Merchant;
  createdAt?: string;
  updatedAt?: string;
  cartItemResponses: UserCartItemResponse[];
  choose: boolean;
}

export interface CartDataType {
  carts: CartType[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  choose: boolean;
}
export interface CartResponse {
  id: number;
  userId: string;
  merchant: Merchant;
  createdAt: string;
  updatedAt: string;
  cartItemResponses: UserCartItemResponse[];
}

export interface Merchant {
  id: number;
  storeName: string;
  logo: string;
  provinceId?: number; 
}
export interface Product {
  id: number;
  title: string;
  price: number;
  anchoPrice: number;
  discountPercent: number;
  shortDescription: string;
  brandName: string;
  imageUrl: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  attributeValues: AttributeValueResponse[];
}

export interface AttributeValueResponse {
  id: number;
  value: string;
  selected: boolean;
}

export interface ProductVariant {
  id: number;
  title: string;
  price: number;
  anchoPrice: number;
  imageUrl: string;
  mainAttributeId: number;
  mainAttributeValueId: number;
  secondAttributeId: number;
  secondAttributeValueId: number;
}

export interface UserCart {
  id: number;
  userId: string;
  merchant: UserCartMerchant;
  createdAt: string;
  updatedAt: string;
  cartItemResponses: UserCartItemResponse[];
}

export interface UserCartMerchant {
  id: number;
  storeName: string;
  logo: string;
}

export interface UserCartItemResponse {
  id: number;
  cartId: number;
  product: UserCartProduct;
  variants: UserCartVariant[];
  quantity: number;
  createdAt: string;
  updatedAt: string;
  activeStatus: boolean;
  choose?: boolean;
}

export interface UserCartProduct {
  id: number;
  title: string;
  price: number;
  anchoPrice: number;
  discountPercent: number;
  shortDescription: string;
  brandName: string;
  imageUrl: string;
}

export interface UserCartVariant {
  attributeName: string;
  variantName: string;
  attributeId: number;
  variantId: number;
}

export interface UserCartData {
  carts: UserCart[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}
export interface CheckoutType {
  productsPrice: number;
  discountProductsPrice: number;
  totalProductsPrice: number;
  shippingPrice: number;
  discountShippingPrice: number;
  totalShippingPrice: number;
  totalPrice: number;
}
