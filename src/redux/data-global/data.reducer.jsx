import { createSlice } from "@reduxjs/toolkit";

export const dataGlobalSlice = createSlice({
  name: "data",
  initialState: {
    indexImport: 0,
  },
  reducers: {
    actionData: (state, action) => {
      state.indexImport = action.payload.indexImport ?? state.indexImport;
    },
    resetData: (state) => {
      state.indexImport = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actionData, resetData } = dataGlobalSlice.actions;
