import { FetchApi } from "@/app/api/FetchApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const submitCareerForm = createAsyncThunk(
  "career/submitCareerForm",
  async (payload, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/career",
        method: "POST",
        body: payload,
      });

      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to submit career form",
      );
    }
  },
);

const careerSlice = createSlice({
  name: "career",
  initialState: {
    loading: false,
    success: false,
    message: "",
    error: null,
  },
  reducers: {
    clearCareerState: (state) => {
      state.loading = false;
      state.success = false;
      state.message = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCareerForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitCareerForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message =
          action.payload?.message || "Form submitted successfully";
      })
      .addCase(submitCareerForm.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearCareerState } = careerSlice.actions;
export default careerSlice.reducer;
