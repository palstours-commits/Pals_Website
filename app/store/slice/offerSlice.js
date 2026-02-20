import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const getOffers = createAsyncThunk(
  "User/getOffers",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/offer",
        method: "GET",
      });

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch menus");
    }
  },
);

const offerSlice = createSlice({
  name: "offer",
  initialState: {
    offers: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearMenuError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload?.Offers || [];
      })
      .addCase(getOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMenuError } = offerSlice.actions;
export default offerSlice.reducer;
