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

type OrderReturnStatus =
  | "PENDING"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELLED"
  | "REJECTED"
  | "ACCEPTED"
  | "IN_REFUND"
  | "REFUNED";
export interface Order {
  id: number;
  userId: string;
  bankName: string;
  bankHolder: string;
  bankNumber: string;
  orderId: number;
  commentReturn: string;
  imageUrls: string;
  reasonReject: null | string;
  shippingId: number;
  status: OrderReturnStatus;
  refundSentByAdmin: null | boolean;
  refundImage: null | string;
  refundReceivedByUser: boolean;
  returnTime: string;
  streetAddress: string;
  wardId: number;
  ward: string;
  districtId: number;
  district: string;
  provinceId: number;
  province: string;
  returnPhone: string;
  returnName: string;
  cancelBy: null | string;
  cancelReason: null | string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
  merchantId: number;
  merchant: API.Merchant;
}

export interface OrdersResponse {
  currentPage: number;
  orderReturns: Order[];
  totalElements: number;
  totalPages: number;
}
