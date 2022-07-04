const intialState = {
  userId: 0,
  username: ''
}

const reducer = (state = intialState, action) => {
  const {type, payload} = action
  const {userId, username} = payload
  switch(type) {
    case "UPDATE_USER":
      return {...state, userId, username}
    case "CLEAR_USER":
      return {...state, userId: 0, username: ''}
  }
}

export default reducer