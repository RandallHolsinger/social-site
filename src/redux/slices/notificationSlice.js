import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messageNotifications: 0,
  friendNotifications: 0
}

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducer: {
    updateFriendNotifications: (state, action) => {
      state.friendNotifications = action.payload.count
    },
    clearFriendNotifications: (initialState) => initialState,
    updateMessageNotifications: (state, action) => {
      state.messageNotifications = action.payload.count
    },
    clearMessageNotifications: (initialState) => initialState
  }
})

const {
  updateFriendNotifications,
  clearFriendNotifications,
  updateMessageNotifications,
  clearMessageNotifications
} = notificationSlice.actions

export default notificationSlice.reducer