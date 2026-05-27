import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const getMenus = createAsyncThunk(
  "submenu/getAllSubMenus",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/menu",
        method: "GET",
      });

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch submenus",
      );
    }
  },
);

export const getIdBySubmenu = createAsyncThunk(
  "submenu/getIdBySubmenu",
  async (slug, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/zone/getzonebymenu/${slug}`,
        method: "GET",
      });

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch submenu",
      );
    }
  },
);

// Keep the original getSlugBySubmenu for menu-based zone fetching
export const getSlugBySubmenu = createAsyncThunk(
  "submenu/getSlugBySubmenu",
  async (slug, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/zone/getzonebymenu/${slug}`,
        method: "GET",
      });

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch submenu",
      );
    }
  },
);

// Add new getZonesBySubmenuSlug for submenu-based zone fetching
export const getZonesBySubmenuSlug = createAsyncThunk(
  "submenu/getZonesBySubmenuSlug",
  async (slug, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/zone/getzonebysubmenu/${slug}`,
        method: "GET",
      });

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch zones",
      );
    }
  },
);

const submenuSlice = createSlice({
  name: "submenu",
  initialState: {
    submenus: [],
    selectedSubmenu: null,
    selectedData: null,
    zones: [],
    menuZones: [], // For zones fetched by menu slug
    currentMenu: null,
    currentSubmenu: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearSubmenuError: (state) => {
      state.error = null;
    },
    setCurrentMenu: (state, action) => {
      state.currentMenu = action.payload;
    },
    setCurrentSubmenu: (state, action) => {
      state.currentSubmenu = action.payload;
    },
    clearZones: (state) => {
      state.zones = [];
    },
  },

  extraReducers: (builder) => {
    builder
      // Get all submenus
      .addCase(getMenus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.submenus = action.payload?.menus || [];
        
        // Set default selected menu (Holidays) if available
        if (action.payload?.menus?.length > 0) {
          const holidaysMenu = action.payload.menus.find(
            menu => menu.name.toLowerCase() === "holidays" || 
                   menu.slug?.toLowerCase() === "holidays"
          );
          
          if (holidaysMenu) {
            state.currentMenu = holidaysMenu;
            
            // Set default submenu if available
            if (holidaysMenu.submenus?.length > 0) {
              const sortedSubmenus = [...holidaysMenu.submenus].sort(
                (a, b) => a.order - b.order
              );
              state.currentSubmenu = sortedSubmenus[0];
            }
          } else {
            // If no holidays menu, set first menu as default
            state.currentMenu = action.payload.menus[0];
            if (action.payload.menus[0]?.submenus?.length > 0) {
              const sortedSubmenus = [...action.payload.menus[0].submenus].sort(
                (a, b) => a.order - b.order
              );
              state.currentSubmenu = sortedSubmenus[0];
            }
          }
        }
      })
      .addCase(getMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get submenu by ID/slug
      .addCase(getIdBySubmenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIdBySubmenu.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedData = action.payload;
        // Update current submenu when data is fetched
        if (action.payload?.submenu) {
          state.currentSubmenu = action.payload.submenu;
        }
      })
      .addCase(getIdBySubmenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get zones by menu slug (original getSlugBySubmenu)
      .addCase(getSlugBySubmenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSlugBySubmenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menuZones = action.payload?.data || [];
      })
      .addCase(getSlugBySubmenu.rejected, (state, action) => {
        state.loading = false;
        state.menuZones = [];
        state.error = action.payload;
      })

      // Get zones by submenu slug
      .addCase(getZonesBySubmenuSlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getZonesBySubmenuSlug.fulfilled, (state, action) => {
        state.loading = false;
        state.zones = action.payload?.data || [];
      })
      .addCase(getZonesBySubmenuSlug.rejected, (state, action) => {
        state.loading = false;
        state.zones = [];
        state.error = action.payload;
      });
  },
});

export const { 
  clearSubmenuError, 
  setCurrentMenu, 
  setCurrentSubmenu, 
  clearZones 
} = submenuSlice.actions;

export default submenuSlice.reducer;