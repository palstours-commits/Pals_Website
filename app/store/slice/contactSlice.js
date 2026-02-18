import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const submitContact = createAsyncThunk(
  "contact/submitContact",
  async (payload, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/form/contact-us",
        method: "POST",
        body: payload,
      });

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to submit contact form",
      );
    }
  },
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    message: "",
    error: null,
  },
  reducers: {
    clearContactState: (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(submitContact.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Submitted successfully";
      })

      .addCase(submitContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearContactState } = contactSlice.actions;
export default contactSlice.reducer;
