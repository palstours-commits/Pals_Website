import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const getMenus = createAsyncThunk(
  "menu/getMenus",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/menu",
        method: "GET",
      });

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch menus"
      );
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menus: [],
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
      .addCase(getMenus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.menus = action.payload?.menus || [];
      })
      .addCase(getMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMenuError } = menuSlice.actions;
export default menuSlice.reducer;
