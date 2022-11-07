import React, { useState } from 'react'
import axios from 'axios'
import FriendDeleteButton from '../FriendDeleteButton/FriendDeleteButton'

function FriendAcceptButton(props) {

  const [showIsFriend, setShowIsFriend] = useState(false)

  const {user_id, friend_id} = props

  const acceptFriendRequest = async () => {
    try {
      await axios.put(`/api/friend/accept/${user_id}`)
      setShowIsFriend(true)
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <div className="FriendAcceptButton">
      {showIsFriend ?
        <div>
          <p>Friends</p>
          <FriendDeleteButton friend_id={friend_id} />
        </div>
      :
        <button onClick={() => acceptFriendRequest() }>Accept</button>
      }
    </div>
  )
}

export default FriendAcceptButton