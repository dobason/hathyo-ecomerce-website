import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AddressInfo,
  AddressDataType,
  AddressItemResponse,
} from "@/types/address";
import {
  addAddressService,
  removeAddressService,
  updateAddressService,
  getListAddressService,
  convertCoordsToAddressService,
} from "@/services/client/address";

interface AddressState {
  addresses: AddressItemResponse[];
  addressSelected?: AddressItemResponse;
  totalElements: number;
  totalPages: number;
  currentPage: number;
  status: "idle" | "loading" | "failed";
}

const initialState: AddressState = {
  addresses: [],
  addressSelected: undefined,
  totalElements: 0,
  totalPages: 0,
  currentPage: 0,
  status: "idle",
};

export const convertCoordsToAddress = createAsyncThunk<
  any, // API trả ra data.boundaries, có thể typing kỹ hơn nếu cần
  { lat: number; lng: number },
  { rejectValue: any }
>(
  "address/convertCoordsToAddress",
  async ({ lat, lng }, { rejectWithValue }) => {
    try {
      const res = await convertCoordsToAddressService({
        params: { lat, lng },
      });
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAddressItems = createAsyncThunk<AddressDataType, undefined>(
  "address/fetchAddressItems",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = (await getListAddressService({
        params: { page: 0, size: 200 },
      })) as any;
      // Assuming response.data actually holds the address data conforming to AddressDataType
      return response; // You need to adjust this based on the actual structure of AddressResponseType
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const addAddressItem = createAsyncThunk<AddressInfo, AddressInfo>(
  "address/addAddressItem",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const response = await addAddressService({ body: item });
      await dispatch(fetchAddressItems()); // Refetch address items after adding
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateAddressItem = createAsyncThunk<
  AddressItemResponse,
  AddressItemResponse
>("address/updateAddressItem", async (item, { rejectWithValue, dispatch }) => {
  try {
    const response = await updateAddressService({
      body: item,
    });
    await dispatch(fetchAddressItems()); // Refetch address items after updating
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const removeAddressItem = createAsyncThunk<void, { id: number }>(
  "address/removeAddressItem",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      await removeAddressService({ body: { id } });
      await dispatch(fetchAddressItems()); // Refetch address items after removing
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);


const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    selectAddress: (state, action: PayloadAction<AddressItemResponse>) => {
      state.addressSelected = action.payload;
    },
    resetAddressState: (state) => {
      state.addresses = [];
      state.addressSelected = undefined;
      state.totalElements = 0;
      state.totalPages = 0;
      state.currentPage = 0;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddressItems.fulfilled, (state, action) => {
        state.status = "idle";

        // Handle case where payload or addresses might be undefined (e.g., during logout)
        if (!action.payload || !action.payload.addresses) {
          state.addresses = [];
          state.addressSelected = undefined;
          state.totalElements = 0;
          state.totalPages = 0;
          return;
        }

        const defaultAddress =
          action.payload.addresses.find(
            (address) => address.isDefault === true
          ) || action.payload.addresses?.[0];
        state.addressSelected = defaultAddress;
        state.addresses = action.payload.addresses;
        state.totalElements = action.payload.totalElements || 0;
        state.totalPages = action.payload.totalPages || 0;
      })
      .addCase(fetchAddressItems.rejected, (state) => {
        state.status = "failed";
        // Reset state on error to prevent stale data
        state.addresses = [];
        state.addressSelected = undefined;
        state.totalElements = 0;
        state.totalPages = 0;
      })
      .addCase(addAddressItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAddressItem.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(addAddressItem.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateAddressItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAddressItem.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(updateAddressItem.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(removeAddressItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeAddressItem.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(removeAddressItem.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { selectAddress, resetAddressState } = addressSlice.actions;

export default addressSlice.reducer;
