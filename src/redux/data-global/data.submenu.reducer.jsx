import { createSlice } from "@reduxjs/toolkit";

export const dataSubmenuSlice = createSlice({
  name: "submenu",
  initialState: {
    submenu: [],
  },
  reducers: {
    addSubmenu: (state, action) => {
      state.submenu = action.payload.submenu ?? state.submenu;
    },
    resetSubmenu: (state) => {
      state.submenu = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addSubmenu, resetSubmenu } = dataSubmenuSlice.actions;
