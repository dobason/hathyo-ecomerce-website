import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GeocodeItemResponse, GeocodeDataType } from "@/types/vietmap";
import { getAddressFromLatLng } from "@/services/client/vietmap";

interface VietmapState {
  geocodes: GeocodeItemResponse[];
  status: "idle" | "loading" | "failed";
}

const initialState: VietmapState = {
  geocodes: [],
  status: "idle",
};

const fetchAddressFromLatLng = createAsyncThunk<
  GeocodeDataType,
  { lat: number; lng: number; text: string }
>("vietmap/fetchGeocode", async ({ text, lat, lng }, { rejectWithValue }) => {
  try {
    const response = (await getAddressFromLatLng({
      body: { text, lat, lng },
    })) as any;

    return { geocodes: response };
  } catch (error: any) {
    return rejectWithValue(error.response);
  }
});

const vietmapSlice = createSlice({
  name: "vietmap",
  initialState,
  reducers: {
    resetGeocodeState: (state) => {
      state.geocodes = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressFromLatLng.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddressFromLatLng.fulfilled, (state, action) => {
        state.status = "idle";
        state.geocodes = action.payload.geocodes;
      })
      .addCase(fetchAddressFromLatLng.rejected, (state) => {
        state.status = "failed";
        // Reset state on error to prevent stale data
        state.geocodes = [];
      });
  },
});

export const { resetGeocodeState } = vietmapSlice.actions;

export default vietmapSlice.reducer;
