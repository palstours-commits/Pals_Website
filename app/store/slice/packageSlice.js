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

export const getNewArrivals = createAsyncThunk(
  "package/getNewArrivals",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/package/new-arrivals",
        method: "GET",
      });

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Failed to fetch new arrival packages",
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

export const getTopDestinations = createAsyncThunk(
  "package/getTopDestinations",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/zone/top-destinations",
        method: "GET",
      });

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Failed to fetch top destinations",
      );
    }
  },
);

const packageSlice = createSlice({
  name: "package",
  initialState: {
    packages: [],
    newArrivals: [],
    packagesBySubmenu: [],
    packagesByMenuAndZone: [],
    topDestinations: [],
    singlePackage: null,
    loading: false,
    newArrivalsLoading: false,
    error: null,
    newArrivalsError: null,
    topDestinationsLoading: false,
    topDestinationsError: null,
  },
  reducers: {
    clearPackageError: (state) => {
      state.newArrivalsError = null;
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

      .addCase(getNewArrivals.pending, (state) => {
        state.newArrivalsLoading = true;
        state.newArrivalsError = null;
      })
      .addCase(getNewArrivals.fulfilled, (state, action) => {
        state.newArrivalsLoading = false;
        state.newArrivals = action.payload?.packages || [];
      })
      .addCase(getNewArrivals.rejected, (state, action) => {
        state.newArrivalsLoading = false;
        state.newArrivalsError = action.payload;
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
      })

      .addCase(getTopDestinations.pending, (state) => {
        state.topDestinationsLoading = true;
        state.topDestinationsError = null;
      })
      .addCase(getTopDestinations.fulfilled, (state, action) => {
        state.topDestinationsLoading = false;
        state.topDestinations = action.payload?.zones || action.payload || [];
      })
      .addCase(getTopDestinations.rejected, (state, action) => {
        state.topDestinationsLoading = false;
        state.topDestinationsError = action.payload;
      });
  },
});

export const { clearPackageError } = packageSlice.actions;
export default packageSlice.reducer;
