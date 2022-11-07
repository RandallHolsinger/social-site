import React, { useState } from 'react'
import axios from 'axios'

function FriendAddButton(props) {
  
  const [showRequestSent, setShowRequestSent] = useState(false)
  const {user_id} = props
  
  const sendFriendRequest = async () => {
    try {
      await axios.post(`/api/friend/send/${user_id}`)
      setShowRequestSent(true)
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <div className="FriendAddButton">
      {showRequestSent ?
        <p>Request Sent</p>
      :
        <button onClick={() => sendFriendRequest()}>Add Friend +</button>
      }
    </div>
  )
}

export default FriendAddButton