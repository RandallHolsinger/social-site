import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: 0,
    username: ''
  },
  reducers: {
    updateUser: (state, action) => {
      state.userId = action.payload
      state.username = action.payload
    },
    clearUser: (initialState) => initialState
  }
})

export const {updateUser, clearUser} = userSlice.actions

export default userSlice.reducer