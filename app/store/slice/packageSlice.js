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

export const getZoneByPackage = createAsyncThunk(
  "package/getZoneByPackage",
  async (slug, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/package/by-zone/${slug}`,
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

export const getPackagesByMenuAndZone = createAsyncThunk(
  "package/getPackagesByMenuAndZone",
  async ({ menuSlug }, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/package/by-menu/${menuSlug}`,
        method: "GET",
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Failed to fetch packages by menu and zone",
      );
    }
  },
);

const packageSlice = createSlice({
  name: "package",
  initialState: {
    packages: [],
    packagesBySubmenu: [],
    packagesByMenuAndZone: [],
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

      .addCase(getZoneByPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getZoneByPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.packagesBySubmenu = action.payload || [];
      })
      .addCase(getZoneByPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getPackagesByMenuAndZone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPackagesByMenuAndZone.fulfilled, (state, action) => {
        state.loading = false;
        state.packagesByMenuAndZone = action.payload.zones || [];
      })
      .addCase(getPackagesByMenuAndZone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPackageError } = packageSlice.actions;
export default packageSlice.reducer;
