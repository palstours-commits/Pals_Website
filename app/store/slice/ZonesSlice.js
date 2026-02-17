import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const getZones = createAsyncThunk(
    "menu/getAllZones",
    async (_, thunkAPI) => {
        try {
            const response = await FetchApi({
                endpoint: "/user/zone/getAllZones",
                method: "GET",
            });

            return response?.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.message || "Failed to fetch zones"
            );
        }
    }
);

export const getByIdZones = createAsyncThunk(
    "menu/getByIdZones",
    async (slug, thunkAPI) => {
        try {
            const response = await FetchApi({
                endpoint: `/user/zone/getZoneById/${slug}`,
                method: "GET",
            });

            return response?.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.message || "Failed to fetch zones"
            );
        }
    }
);

const zonesSlice = createSlice({
    name: "zones",
    initialState: {
        zones: [],
        loading: false,
        error: null,
        zoned: [],
    },
    reducers: {
        clearZoneError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getZones.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getZones.fulfilled, (state, action) => {
                state.loading = false;
                state.zones = action.payload?.zones || [];
            })
            .addCase(getZones.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getByIdZones.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getByIdZones.fulfilled, (state, action) => {
                state.loading = false;
                state.zoned = action.payload?.zones || [];
            })
            .addCase(getByIdZones.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { clearZoneError } = zonesSlice.actions;
export default zonesSlice.reducer;
