import React, { useState, useEffect } from 'react'
import './FriendAcceptButton.scss'
import axios from 'axios'

function FriendAcceptButton(props) {
   console.log('props Friend Accept Button ==>', props)
  const confirmFriendRequest = async () => {
    const {friend_id, getFriends} = props
    try {
      await axios.put(`/api/friend/request/confirm/${friend_id}`)
      getFriends()
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <>
      <button onClick={() => confirmFriendRequest()}>Confirm</button>
      <button>Delete</button>
    </>
  )
}

export default FriendAcceptButton
