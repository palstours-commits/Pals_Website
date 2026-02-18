import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const submitEnquiry = createAsyncThunk(
  "enquiry/submitEnquiry",
  async (payload, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/form/enquiry", 
        method: "POST",
        body: payload,
      });

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to submit enquiry form"
      );
    }
  }
);

const enquirySlice = createSlice({
  name: "enquiry",
  initialState: {
    loading: false,
    message: "",
    error: null,
  },
  reducers: {
    clearEnquiryState: (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitEnquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(submitEnquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.message =
          action.payload?.message || "Enquiry submitted successfully";
      })

      .addCase(submitEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEnquiryState } = enquirySlice.actions;
export default enquirySlice.reducer;
