import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const getPackages = createAsyncThunk(
  "menu/getAllPackages",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/package/getAllPackages",
        method: "GET",
      });

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch packages",
      );
    }
  },
);

export const getPackagesBySubmenu = createAsyncThunk(
  "package/getPackagesBySubmenu",
  async (slug, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/package/by-submenu/${slug}`,
        method: "GET",
      });

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Failed to fetch packages by submenu",
      );
    }
  },
);

const packageSlice = createSlice({
  name: "package",
  initialState: {
    packages: [],
    packagesBySubmenu: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearPackageError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload?.packages || [];
      })
      .addCase(getPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getPackagesBySubmenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPackagesBySubmenu.fulfilled, (state, action) => {
        state.loading = false;
        state.packagesBySubmenu = action.payload || [];
      })
      .addCase(getPackagesBySubmenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPackageError } = packageSlice.actions;
export default packageSlice.reducer;
