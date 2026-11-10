import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const searchPackages = createAsyncThunk(
  "search/searchPackages",
  async (query, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/search?${new URLSearchParams({ query })}`,
        method: "GET",
      });

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message || "Search failed");
    }
  },
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    loading: false,
    error: null,
    activeRequestId: null,
  },

  reducers: {
    clearSearchError: (state) => {
      state.error = null;
    },
    clearSearchResults: (state) => {
      state.results = [];
      state.loading = false;
      state.error = null;
      state.activeRequestId = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchPackages.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.activeRequestId = action.meta.requestId;
      })
      .addCase(searchPackages.fulfilled, (state, action) => {
        if (state.activeRequestId !== action.meta.requestId) return;
        state.loading = false;
        state.results = action.payload?.packages || [];
        state.activeRequestId = null;
      })
      .addCase(searchPackages.rejected, (state, action) => {
        if (state.activeRequestId !== action.meta.requestId) return;
        state.loading = false;
        state.error = action.payload;
        state.activeRequestId = null;
      });
  },
});

export const { clearSearchError, clearSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
