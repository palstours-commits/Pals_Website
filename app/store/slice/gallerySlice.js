import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const getGalleryImages = createAsyncThunk(
  "gallery/getGalleryImages",
  async ({ page = 1, limit = 10 } = {}, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/gallery/images?page=${page}&limit=${limit}`,
        method: "GET",
      });

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch gallery images",
      );
    }
  },
);

export const getGalleryVideos = createAsyncThunk(
  "gallery/getGalleryVideos",
  async ({ page = 1, limit = 10 } = {}, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/gallery/videos?page=${page}&limit=${limit}`,
        method: "GET",
      });

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch gallery videos",
      );
    }
  },
);

const gallerySlice = createSlice({
  name: "gallery",

  initialState: {
    galleryImages: [],
    galleryVideos: [],
    imagePagination: {
      page: 1,
      limit: 10,
      totalItems: 0,
      totalPages: 1,
    },

    videoPagination: {
      page: 1,
      limit: 10,
      totalItems: 0,
      totalPages: 1,
    },

    imageLoading: false,
    videoLoading: false,

    error: null,
  },

  reducers: {
    clearGalleryError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getGalleryImages.pending, (state) => {
        state.imageLoading = true;
        state.error = null;
      })

      .addCase(getGalleryImages.fulfilled, (state, action) => {
        state.imageLoading = false;
        const data = action.payload;
        state.galleryImages = data?.images || data?.data || data || [];
        state.imagePagination = {
          page: data?.page || 1,
          limit: data?.limit || 10,
          totalItems: data?.totalItems || data?.total || 0,
          totalPages: data?.totalPages || 1,
        };
      })

      .addCase(getGalleryImages.rejected, (state, action) => {
        state.imageLoading = false;
        state.galleryImages = [];
        state.error = action.payload;
      })

      .addCase(getGalleryVideos.pending, (state) => {
        state.videoLoading = true;
        state.error = null;
      })

      .addCase(getGalleryVideos.fulfilled, (state, action) => {
        state.videoLoading = false;
        const data = action.payload;
        state.galleryVideos = data?.videos || data?.data || data || [];

        state.videoPagination = {
          page: data?.page || 1,
          limit: data?.limit || 10,
          totalItems: data?.totalItems || data?.total || 0,
          totalPages: data?.totalPages || 1,
        };
      })

      .addCase(getGalleryVideos.rejected, (state, action) => {
        state.videoLoading = false;
        state.galleryVideos = [];
        state.error = action.payload;
      });
  },
});

export const { clearGalleryError } = gallerySlice.actions;

export default gallerySlice.reducer;
