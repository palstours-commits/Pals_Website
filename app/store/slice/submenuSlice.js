import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const getSubMenus = createAsyncThunk(
  "submenu/getAllSubMenus",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/submenu/getAllSubMenus",
        method: "GET",
      });

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch submenus",
      );
    }
  },
);

export const getIdBySubmenu = createAsyncThunk(
  "submenu/getIdBySubmenu",
  async (slug, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/submenu/getSubMenuBySlug/${slug}`,
        method: "GET",
      });

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch submenu",
      );
    }
  },
);

export const getSlugBySubmenu = createAsyncThunk(
  "submenu/getSlugBySubmenu",
  async (slug, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/submenu/getZonesBySubmenu/${slug}`,
        method: "GET",
      });

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch submenu",
      );
    }
  },
);

const submenuSlice = createSlice({
  name: "submenu",
  initialState: {
    submenus: [],
    selectedSubmenu: null,
    selectedData: null,
    zones: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearSubmenuError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getSubMenus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.submenus = action.payload?.menus || [];
      })
      .addCase(getSubMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getIdBySubmenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIdBySubmenu.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedData = action.payload;
      })
      .addCase(getIdBySubmenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getSlugBySubmenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSlugBySubmenu.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSubmenu = action.payload?.zones;
      })
      .addCase(getSlugBySubmenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSubmenuError } = submenuSlice.actions;
export default submenuSlice.reducer;
