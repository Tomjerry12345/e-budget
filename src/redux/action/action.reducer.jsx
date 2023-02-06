import { createSlice } from '@reduxjs/toolkit'
import { log } from '../../values/Utilitas'

export const notifSlice = createSlice({
  name: 'notif',
  initialState: {
    status: 0,
    message: ""
  },
  reducers: {
    val: (state, action) => {
      state.status = action.payload.status
      state.message = action.payload.message
    },
  }
})

// Action creators are generated for each case reducer function
export const { val} = notifSlice.actions

export default notifSlice.reducer