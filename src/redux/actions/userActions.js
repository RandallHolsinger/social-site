export const updateUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_USER",
      payload: user
    })
  }
}

export default clearUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_USER",
      payload: user
    })
  }
}