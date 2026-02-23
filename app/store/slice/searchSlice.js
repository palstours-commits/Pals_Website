import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const searchPackages = createAsyncThunk(
  "search/searchPackages",
  async (query, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/search?query=${query}`,
        method: "GET",
      });

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Search failed",
      );
    }
  },
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearSearchError: (state) => {
      state.error = null;
    },
    clearSearchResults: (state) => {
      state.results = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload?.packages || [];
      })
      .addCase(searchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSearchError, clearSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
