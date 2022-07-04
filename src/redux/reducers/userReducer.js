const intialState = {
  userId: 0,
  username: ''
}

const reducer = (state = intialState, action) => {
  const {type, payload} = action
  switch(type) {
    case "UPDATE_USER":
      const {userId, username} = payload
      return {...state, userId, username}
    case "CLEAR_USER":
      return {...state, userId: 0, username: ''}
    default:
      return state
  }
}

export default reducer