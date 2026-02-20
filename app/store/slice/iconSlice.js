import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "@/app/api/FetchApi";

export const getIcons = createAsyncThunk(
  "submenu/getIcons",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/icon",
        method: "GET",
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch submenu icons",
      );
    }
  },
);

const iconSlice = createSlice({
  name: "icon",
  initialState: {
    icons: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearIconError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getIcons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIcons.fulfilled, (state, action) => {
        state.loading = false;
        state.icons = action.payload?.icons;
      })
      .addCase(getIcons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearIconError } = iconSlice.actions;
export default iconSlice.reducer;
