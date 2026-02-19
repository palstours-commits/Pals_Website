import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const submitFlightForm = createAsyncThunk(
  "serviceForm/submitFlightForm",
  async (payload, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/form/flight",
        method: "POST",
        body: payload,
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          err.message ||
          "Failed to submit flight form",
      );
    }
  },
);

export const submitHotelForm = createAsyncThunk(
  "serviceForm/submitHotelForm",
  async (payload, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/form/hotel",
        method: "POST",
        body: payload,
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          err.message ||
          "Failed to submit hotel form",
      );
    }
  },
);

export const submitTransportForm = createAsyncThunk(
  "serviceForm/submitTransportForm",
  async (payload, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/form/transport",
        method: "POST",
        body: payload,
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          err.message ||
          "Failed to submit transport form",
      );
    }
  },
);

export const submitVisaForm = createAsyncThunk(
  "serviceForm/submitVisaForm",
  async (payload, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/form/visa",
        method: "POST",
        body: payload,
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          err.message ||
          "Failed to submit visa form",
      );
    }
  },
);

const serviceFormSlice = createSlice({
  name: "serviceForm",
  initialState: {
    loading: false,
    message: "",
    error: null,
  },
  reducers: {
    clearServiceFormState: (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFlightForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitFlightForm.fulfilled, (state, action) => {
        state.loading = false;
        state.message =
          action.payload?.message || "Flight enquiry submitted successfully";
      })
      .addCase(submitFlightForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(submitHotelForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitHotelForm.fulfilled, (state, action) => {
        state.loading = false;
        state.message =
          action.payload?.message || "Hotel enquiry submitted successfully";
      })
      .addCase(submitHotelForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(submitTransportForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitTransportForm.fulfilled, (state, action) => {
        state.loading = false;
        state.message =
          action.payload?.message || "Transport enquiry submitted successfully";
      })
      .addCase(submitTransportForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(submitVisaForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitVisaForm.fulfilled, (state, action) => {
        state.loading = false;
        state.message =
          action.payload?.message || "Visa enquiry submitted successfully";
      })
      .addCase(submitVisaForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearServiceFormState } = serviceFormSlice.actions;
export default serviceFormSlice.reducer;
