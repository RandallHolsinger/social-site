import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: 0,
  username: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      console.log('here is the action', action)
      state.userId = action.payload.user_id
      state.username = action.payload.username
    },
    clearUser: (initialState) => initialState
  }   
})

export const {updateUser, clearUser} = userSlice.actions

export default userSlice.reducer