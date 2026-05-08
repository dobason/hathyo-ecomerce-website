import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ShoppingCart, Note } from "@/types/checkout";

export type PaymentShippingMethod = {
  id: "express" | "economical";
  name: string;
  price: number;
  estimatedTime: string;
};

export type PaymentMerchantShipping = {
  cartId: number;
  express: boolean;
  economical: boolean;
};

interface PaymentState {
  selectedShippingMethods: Record<number, PaymentShippingMethod>;
  merchantShippingMethods: Record<number, PaymentMerchantShipping>;
  // Checkout states
  previewCheckout?: ShoppingCart;
  isCheckoutLoading: boolean;
  isAddressChanging: boolean;
  isUpdatingShipping: boolean;
  isUpdatingCoupon: boolean;
  // Coupon / notes / success
  selectedCouponCode?: string | null;
  userNotes: Note[];
  isPaymentSuccess: boolean;
  selectedCouponId?: number | null;
}

const initialState: PaymentState = {
  selectedShippingMethods: {},
  merchantShippingMethods: {},
  previewCheckout: undefined,
  isCheckoutLoading: false,
  isAddressChanging: false,
  isUpdatingShipping: false,
  isUpdatingCoupon: false,
  selectedCouponCode: null,
  selectedCouponId: null,
  userNotes: [],
  isPaymentSuccess: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentShippingMethod: (
      state,
      action: PayloadAction<{ cartId: number; method: PaymentShippingMethod }>
    ) => {
      const { cartId, method } = action.payload;
      state.selectedShippingMethods[cartId] = method;
    },
    setPaymentMerchantShippingMethods: (
      state,
      action: PayloadAction<{
        cartId: number;
        methods: PaymentMerchantShipping;
      }>
    ) => {
      const { cartId, methods } = action.payload;
      state.merchantShippingMethods[cartId] = methods;
    },
    clearPaymentData: (state) => {
      state.selectedShippingMethods = {};
      state.merchantShippingMethods = {};
      state.previewCheckout = undefined;
      state.isCheckoutLoading = false;
      state.isAddressChanging = false;
      state.isUpdatingShipping = false;
      state.isUpdatingCoupon = false;
      state.selectedCouponCode = null;
      state.selectedCouponId = null;
      state.userNotes = [];
      state.isPaymentSuccess = false;
    },
    resetAllShippingToEconomical: (state, action: PayloadAction<number[]>) => {
      const cartIds = action.payload;
      cartIds.forEach((cartId) => {
        state.selectedShippingMethods[cartId] = {
          id: "economical",
          name: "Giao hàng tiết kiệm",
          price: 0,
          estimatedTime: "3-5 ngày",
        };
      });
    },
    setPreviewCheckout: (
      state,
      action: PayloadAction<ShoppingCart | undefined>
    ) => {
      state.previewCheckout = action.payload;
    },
    setIsCheckoutLoading: (state, action: PayloadAction<boolean>) => {
      state.isCheckoutLoading = action.payload;
    },
    setIsAddressChanging: (state, action: PayloadAction<boolean>) => {
      state.isAddressChanging = action.payload;
    },
    setIsUpdatingShipping: (state, action: PayloadAction<boolean>) => {
      state.isUpdatingShipping = action.payload;
    },
    setIsUpdatingCoupon: (state, action: PayloadAction<boolean>) => {
      state.isUpdatingCoupon = action.payload;
    },
    setSelectedCouponCode: (
      state,
      action: PayloadAction<string | null | undefined>
    ) => {
      state.selectedCouponCode = action.payload ?? null;
    },
    setSelectedCouponId: (
      state,
      action: PayloadAction<number | null | undefined>
    ) => {
      state.selectedCouponId = action.payload ?? null;
    },
    setUserNotes: (state, action: PayloadAction<Note[]>) => {
      state.userNotes = action.payload;
    },
    setIsPaymentSuccess: (state, action: PayloadAction<boolean>) => {
      state.isPaymentSuccess = action.payload;
    },
    clearSelectedShippingMethods: (state) => {
      state.selectedShippingMethods = {};
    },
  },
});

export const {
  setPaymentShippingMethod,
  setPaymentMerchantShippingMethods,
  clearPaymentData,
  resetAllShippingToEconomical,
  setPreviewCheckout,
  setIsCheckoutLoading,
  setIsAddressChanging,
  setIsUpdatingShipping,
  setIsUpdatingCoupon,
  setSelectedCouponCode,
  setUserNotes,
  setIsPaymentSuccess,
  clearSelectedShippingMethods,
  setSelectedCouponId,
} = paymentSlice.actions;

export default paymentSlice.reducer;
