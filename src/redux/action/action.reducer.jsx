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
  },
  reducers: {
    actionImport: (state, action) => {
      state.loading = action.payload.loading ?? state.loading;
      state.openMore = action.payload.openMore ?? state.openMore;
      state.openImport = action.payload.openImport ?? state.openImport;
    },
    resetDataActionImport: (state) => {
      state.loading = false;
      state.openMore = false;
      state.openImport = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actionImport, resetDataActionImport } = importSlice.actions;
