import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const getBlogs = createAsyncThunk(
  "blog/getBlogs",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/blog",
        method: "GET",
      });

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch blogs");
    }
  },
);

export const getBlogBySlug = createAsyncThunk(
  "blog/getBlogBySlug",
  async (slug, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/blog/${slug}`,
        method: "GET",
      });

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch blog");
    }
  },
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    blogDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearBlogError: (state) => {
      state.error = null;
    },
    clearBlogDetails: (state) => {
      state.blogDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload?.blogs || action.payload || [];
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getBlogBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.blogDetails = action.payload?.blog || action.payload;
      })
      .addCase(getBlogBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBlogError, clearBlogDetails } = blogSlice.actions;
export default blogSlice.reducer;
