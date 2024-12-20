import { createSlice } from "@reduxjs/toolkit";

export const notifSlice = createSlice({
  name: "notif",
  initialState: {
    status: 0,
    message: "",
  },
  reducers: {
    val: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { val } = notifSlice.actions;

export const importSlice = createSlice({
  name: "import",
  initialState: {
    loading: false,
    openMore: false,
    openImport: false,
    file: null,
  },
  reducers: {
    actionImport: (state, action) => {
      state.loading = action.payload.loading ?? state.loading;
      state.openMore = action.payload.openMore ?? state.openMore;
      state.openImport = action.payload.openImport ?? state.openImport;
      state.file = action.payload.file ?? state.file;
    },
    resetDataActionImport: (state) => {
      state.loading = false;
      state.openMore = false;
      state.openImport = false;
      state.file = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actionImport, resetDataActionImport } = importSlice.actions;

export const revenueSlice = createSlice({
  name: "revenue",
  initialState: {
    filterValuesPenjualan: undefined,
    filterValuesHpplain: undefined,
  },
  reducers: {
    actionRevenue: (state, action) => {
      state.filterValuesPenjualan = action.payload.filterValuesPenjualan;
      state.filterValuesHpplain = action.payload.filterValuesHpplain;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actionRevenue } = revenueSlice.actions;
