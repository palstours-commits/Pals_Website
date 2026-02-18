import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";
import { parseHtmlList } from "@/app/utils/textConvertor";

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

export const getPackagesById = createAsyncThunk(
  "package/getPackagesById",
  async (id, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/package/getPackageById/${id}`,
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
    singlePackage: null,
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

      .addCase(getPackagesById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPackagesById.fulfilled, (state, action) => {
        state.loading = false;
        const packageData = action?.payload;
        state.singlePackage = {
          ...packageData,
          tripHighlightsPoints: parseHtmlList(packageData?.tripHighlights),
          importantInfoPoints: parseHtmlList(packageData?.importantInfo),
        };
      })
      .addCase(getPackagesById.rejected, (state, action) => {
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
