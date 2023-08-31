import { createSlice } from "@reduxjs/toolkit";

export const dataGlobalSlice = createSlice({
  name: "data",
  initialState: {
    indexImport: 0,
    sizeDataRevenue: 0,
    typeRevenueImport: null,
    year: null,
    listCompany: null,
    code_company: null,
  },
  reducers: {
    actionData: (state, action) => {
      state.indexImport = action.payload.indexImport ?? state.indexImport;
      state.sizeDataRevenue = action.payload.sizeDataRevenue ?? state.sizeDataRevenue;
      state.typeRevenueImport = action.payload.typeRevenueImport ?? state.typeRevenueImport;
      state.year = action.payload.year ?? state.year;
      state.listCompany = action.payload.listCompany ?? state.listCompany;
      state.code_company = action.payload.code_company ?? state.code_company;
    },
    resetData: (state) => {
      state.indexImport = 0;
      state.sizeDataRevenue = 0;
    },
    resetTypeRevenueImport: (state) => {
      state.typeRevenueImport = null;
      state.year = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actionData, resetData, resetTypeRevenueImport } = dataGlobalSlice.actions;
