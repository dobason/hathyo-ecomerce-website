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
  createdAt: string;
  deliveredAt: string;
  chooseReturn: boolean;
  returned: boolean;
  rated: boolean;
}

export interface Order {
  id: number;
  userId: string;
  orderCode: string;
  customerName: string;
  customerPhone: string;
  customerStreetAddress: string | null;
  customerWard: string | null;
  customerDistrict: string | null;
  customerProvince: string | null;
  paymentMethod: string | null;
  totalProductAmount: number | null;
  totalPrice: number | null;
  totalProductsPrice: number | null;
  totalShippingPrice: number | null;
  shippingFee: number;
  discountAmount: number | null;
  totalAmount: number | null;
  coupon: string | null;
  globalCoupon: string | null;
  createdAt: string;
  updatedAt: string | null;
  status: string;
  orderItems: OrderItem[];
  merchantId: number;
  merchant: API.Merchant;
  userNote?: string;
}

export interface OrdersResponse {
  currentPage: number;
  orders: Order[];
  totalElements: number;
  totalPages: number;
}
