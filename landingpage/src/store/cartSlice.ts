import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductDetail } from "@/types";
import {
  ICartItem,
  CartDataType,
  UserCartItemResponse,
} from "@/types/cart-item";
import {
  addCartItemService,
  removeCartItemService,
  updateCartItemService,
  getUserCart,
  updateChooseAll,
  updateChooseByMerchantId,
  updateChooseByItemId,
  updateChooseByProductId,
} from "@/services/client/cart";

interface CartState {
  carts: CartDataType;
  recentlyViewed: ProductDetail[];
  totalItems: number;
  totalChooseItem: number;
  totalPrice: number;
  choose: boolean;
  status: "idle" | "loading" | "failed";
  totalProductsInCart: number;
}

const defaultCarts = {
  carts: [],
  totalElements: 0,
  totalPages: 0,
  currentPage: 0,
  choose: false,
  totalProductsInCart: 0,
};

const initialState: CartState = {
  carts: defaultCarts,
  recentlyViewed: [],
  totalItems: 0,
  totalChooseItem: 0,
  totalPrice: 0,
  choose: false,
  status: "idle",
  totalProductsInCart: 0,
};

export const fetchCartItems = createAsyncThunk<CartDataType, undefined>(
  "cart/fetchCartItems",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = (await getUserCart({
        params: { page: 0, size: 200 },
      })) as any;
      // Assuming response.data actually holds the cart data conforming to CartDataType
      return response; // You need to adjust this based on the actual structure of CartResponseType
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const addCartItem = createAsyncThunk<ICartItem, ICartItem>(
  "cart/addCartItem",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const response = await addCartItemService({ body: item });
      await dispatch(fetchCartItems()); // Refetch cart items after adding
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateCartItem = createAsyncThunk<UserCartItemResponse, ICartItem>(
  "cart/updateCartItem",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const response = await updateCartItemService({
        body: item,
      });
      await dispatch(fetchCartItems()); // Refetch cart items after updating
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeCartItem = createAsyncThunk<void, { id: number }>(
  "cart/removeCartItem",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      await removeCartItemService({ params: { id } });
      await dispatch(fetchCartItems()); // Refetch cart items after removing
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAllIsChoose = createAsyncThunk(
  "cart/updateAllIsChoose",
  async ({ choose }: { choose: boolean }, { rejectWithValue, dispatch }) => {
    try {
      await updateChooseAll({ body: { choose } });
      await dispatch(fetchCartItems());
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateIsChooseByMerchant = createAsyncThunk(
  "cart/updateIsChooseByMerchant",
  async (
    { id, choose }: { id: number; choose?: boolean },
    { rejectWithValue, dispatch }
  ) => {
    try {
      await updateChooseByMerchantId({ body: { id, choose } });
      await dispatch(fetchCartItems());
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateIsChooseByItem = createAsyncThunk(
  "cart/updateIsChooseByItem",
  async (
    { id, choose }: { id: number; choose: boolean },
    { rejectWithValue, dispatch }
  ) => {
    try {
      await updateChooseByItemId({ body: { id, choose } });
      await dispatch(fetchCartItems());
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateIsChooseByProduct = createAsyncThunk(
  "cart/updateIsChooseByProduct",
  async (
    { id, choose }: { id: number; choose: boolean },
    { rejectWithValue, dispatch }
  ) => {
    try {
      await updateChooseByProductId({ body: { id, choose } });
      await dispatch(fetchCartItems());
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.carts = defaultCarts;
      state.totalItems = 0;
    },
    addRecentlyViewed: (state, action: PayloadAction<ProductDetail>) => {
      const existingIndex = state.recentlyViewed.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex !== -1) {
        state.recentlyViewed.splice(existingIndex, 1);
      }
      state.recentlyViewed.unshift(action.payload);
      if (state.recentlyViewed.length > 10) {
        state.recentlyViewed.length = 10;
      }
    },
    resetRecentlyViewed: (state) => {
      state.recentlyViewed = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "idle";
        state.carts = { ...state.carts, ...action.payload };
        let count = 0;
        let totalPrice = 0;
        let totalProductsInCart = 0;
        action.payload?.carts?.forEach((cart) => {
          totalProductsInCart += cart?.cartItemResponses.length;
          cart?.cartItemResponses.forEach((item) => {
            if (item.choose === true) {
              totalPrice += item.product.price * item.quantity;
              count++;
            }
          });
        });
        state.totalChooseItem = count;
        state.totalPrice = totalPrice;
        state.totalProductsInCart = totalProductsInCart;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCartItem.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(addCartItem.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartItem.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(updateCartItem.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(removeCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeCartItem.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(removeCartItem.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateAllIsChoose.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAllIsChoose.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(updateAllIsChoose.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateIsChooseByMerchant.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateIsChooseByMerchant.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(updateIsChooseByMerchant.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateIsChooseByItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateIsChooseByItem.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(updateIsChooseByItem.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateIsChooseByProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateIsChooseByProduct.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(updateIsChooseByProduct.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { clearCart, addRecentlyViewed, resetRecentlyViewed } =
  cartSlice.actions;

export default cartSlice.reducer;
