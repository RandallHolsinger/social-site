import React from 'react'
import './FriendAcceptButton.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

// ==> Merge this Component with FriendAdd Component and create FRIEND STATUS component

function FriendAcceptButton(props) {
    
    const confirmFriendRequest = async () => {
    const {friend_id, handleRefreshFriends} = props
    try {
      await axios.put(`/api/friend/request/confirm/${friend_id}`)
      handleRefreshFriends()
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <>
      <button onClick={() => confirmFriendRequest()}><FontAwesomeIcon icon={faUserPlus} /> Confirm</button>
    </>
  )
}

export default FriendAcceptButton
