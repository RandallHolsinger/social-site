const initialState = {
    user_id: 0,
    username: ''
}

const UPDATE_USER = 'UPDATE_USER';
const CLEAR_USER = 'CLEAR_USER';

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function clearUser(user) {
    return {
        type: CLEAR_USER,
        payload: user
    }
}

export default function reducer(state = initialState, action){
  const {payload, type} = action;
  switch(type) {
      case UPDATE_USER:
        const {user_id, username} = payload;
        return {...state, user_id, username}
      case CLEAR_USER:
        return {...state, user_id: 0, username: ''}

      default:
        return state
    } 
  }