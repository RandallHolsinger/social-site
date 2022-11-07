import React from 'react'
import axios from 'axios'

function FriendAddButton(props) {
  
  const sendFriendRequest = async () => {
    const {user_id} = props
    try {
      await axios.post(`/api/friend/send/${user_id}`)
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <div className="FriendAddButton">
      <button onClick={() => sendFriendRequest()}>Add Friend +</button>
    </div>
  )
}

export default FriendAddButton