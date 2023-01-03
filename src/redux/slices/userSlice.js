import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: 0,
  firstName: '',
  lastName: '',
  profileImage: '' 
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.userId = action.payload.user_id
      state.firstName = action.payload.first_name
      state.lastName = action.payload.last_name
      state.profileImage = action.payload.profile_img
    },
    clearUser: (initialState) => initialState
  }   
})

export const {updateUser, clearUser} = userSlice.actions

export default userSlice.reducer