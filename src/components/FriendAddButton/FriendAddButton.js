import React, { useState, useEffect } from 'react'
import './FriendAddButton.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function FriendAddButton(props) {

  const sendFriendRequest = async () => {
    const {user_id} = props
    console.log('user id from profile ==>', user_id)
    try {
      axios.post(`/api/friend/request/send/${user_id}`)
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <>
      <button onClick={() => sendFriendRequest()}><FontAwesomeIcon icon={faUserPlus} />{' '}Add Friend</button>
    </>
  )
}

export default FriendAddButton