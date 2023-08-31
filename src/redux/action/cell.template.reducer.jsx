import { createSlice } from "@reduxjs/toolkit";

export const cellTemplateSlice = createSlice({
  name: "cellTemplate",
  initialState: {
    clickedActivated: false,
    clickedUpdate: false,
    status: "",
  },
  reducers: {
    changeCellTemplate: (state, action) => {
      state.clickedActivated = action.payload.clickedActivated;
      state.clickedUpdate = action.payload.clickedUpdate;
    },
  },
});

export const { changeCellTemplate } = cellTemplateSlice.actions;
