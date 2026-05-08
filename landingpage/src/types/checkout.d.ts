export interface Cart {
  id: number;
  merchant: Merchant;
  productsPrice: number;
  discountProductsPrice: number;
  totalProductsPrice: number;
  shippingPrice: number;
  discountShippingPrice: number;
  totalShippingPrice: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  cartItems: CartItem[];
}

export interface Merchant {
  id: number;
  storeName: string;
  logo: string;
}

export interface CartItem {
  id: number;
  cartId: number;
  variant: Variant;
  quantity: number;
  productPrice: number;
  totalProductPrice: number;
  discountProductPrice: number;
  totalDiscountProductPrice: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  activeStatus: boolean;
}

export interface Variant {
  id: number;
  title: string;
  price: number;
  anchoPrice: number;
  imageUrl: string;
  mainAttributeId: number | null;
  mainAttributeValueId: number | null;
  secondAttributeId: number | null;
  secondAttributeValueId: number | null;
}

export interface ShoppingCart {
  carts: Cart[];
  productsPrice: number;
  discountProductsPrice: number;
  totalProductsPrice: number;
  shippingPrice: number;
  discountShippingPrice: number;
  totalShippingPrice: number;
  totalPrice: number;
}

export interface Note {
  cartId: number;
  userNote: string;
}
