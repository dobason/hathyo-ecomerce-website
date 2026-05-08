// @ts-ignore
/* eslint-disable */

declare namespace API {
  type OrderReturn = {
    id: number;
    userId: string;
    orderCode: any;
    customerName: string;
    customerPhone: string;
    customerStreetAddress: string;
    customerWard: string;
    customerDistrict: string;
    customerCity: string;
    paymentMethod: string;
    totalProductAmount: number;
    shippingFee: number;
    discountAmount: number;
    totalAmount: number;
    coupon: string;
    globalCoupon: any;
    createdAt: string;
    updatedAt: any;
    status: string;
    orderItems: OrderItem[];
    merchantId: any;
  };

  type OrderItem = {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    title: string;
    price: number;
  };

  type OrderReturnResponse = {
    currentPage: number;
    orderReturns: OrderReturn[];
    totalElements: number;
    totalPages: number;
  };

  type UpdateMerchantStatusParams = {
    id?: string;
    status?: string;
  };

  type CityInfo = {
    _id: string;
    country_id: string;
    name: string;
    name_vi_vn: string;
    level: number;
  };

  type CityResponse = {
    status: string;
    timestamp: string;
    message: CityInfo[];
  };

  type Location = {
    lng: number;
    lat: number;
  };

  type Request = {
    _id: string;
    name: string;
    enable: boolean;
    name_vi_vn: string;
    name_en_us: string;
    icon_url: string;
    order: number;
    price: number;
    no_commission: boolean;
    type: string;
    description: string;
    service_id: string;
    capital_coefficient: number;
    subtype: string;
    group_id: string;
    service_group_id: string;
    original_price: number;
  };

  type DistanceFeeV3 = {
    blocks: Array<{
      from: number;
      to: number;
      base: number;
      price_multiplier: number;
    }>;
    hour_rates: any[];
  };

  type ServiceDetail = {
    _id: string;
    commission_type: string;
    require_to: boolean;
    require_request: boolean;
    parent_id: string;
    city_id: string;
    enable: boolean;
    name: string;
    name_vi_vn: string;
    name_en_us: string;
    description_en_us: string;
    description_vi_vn: string;
    fee_description_en_us: string;
    fee_description_vi_vn: string;
    icon_url: string;
    map_icon_url: string;
    order: number;
    broadcast_distance: number;
    stop_fee: number;
    distance_fee: string;
    commission_value: number;
    accept_interval: number;
    timeout: number;
    cod: number;
    stop_failed: number;
    advance_broadcast_distance: number;
    max_concurrent_orders: number;
    partner: boolean;
    max_stop_points: number;
    supplier_description: string;
    location: Location[];
    notify_package_return: boolean;
    cross_service: {
      enable: boolean;
      services: string[];
    };
    advance_max_concurrent_orders: number;
    delivery_type: string;
    max_distance: number;
    need_confirm_before_pickup: boolean;
    max_cod: number;
    supplier_description_vi_vn: string;
    supplier_description_url: string;
    opening_hours: string;
    vat_rate: number;
    distance_fee_v3: DistanceFeeV3;
    enable_cancellation_punishment: boolean;
    require_pod: boolean;
    require_pof: boolean;
    require_pop: boolean;
    group_id: string;
    priority_score: number;
    animated_url: string;
    requests: Request[];
    currency: string;
  };

  type ServiceTypeResponse = {
    status: string;
    timestamp: string;
    message: ServiceDetail[];
  };

  type OrderTransRequest = {
    id: number;
    remarks: string;
    order_time: string;
    payment_method: 'BALANCE' | 'CASH' | 'CASH_BY_RECIPIENT'; // Enum-like type if 'BALANCE' is the only option, else use string
    service_id: string;
  };

  type OrderCancelRequest = {
    id: number;
    cancelReason: string;
    otherReason: string;
  };

  type OrderRevenueSearch = { merchantId: string; time: any[] };
}
