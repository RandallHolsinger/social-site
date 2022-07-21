import React, { useState, useEffect } from 'react'
import './FriendAcceptButton.scss'
import axios from 'axios'

function FriendAcceptButton(props) {

  const [friends, setFriends] = useState([])

  const confirmFriendRequest = async () => {
    const {friend_id} = props
    try {
      axios.put(`/api/friend/request/confirm/${friend_id}`)
    } catch(err) {
      console.log(err)
    }
  }

  const checkFriendStatus = () => {
    const {friend_id} = props
    // try{
    //   let res = await axios.get(`/api/friends`)
    // }
  }

  return(
    <>
      <button onClick={() => confirmFriendRequest()}>Confirm</button>
      <button>Delete</button>
    </>
  )
}

export default FriendAcceptButton
