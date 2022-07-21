import React, { useState, useEffect } from 'react'
import './FriendAddButton.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function FriendAddButton(props) {

  const [friendRequests, setFriendRequests] = useState([])

  const sendFriendRequest = async () => {
    const {user_id} = props
    console.log('user id from profile ==>', user_id)
    try {
       await axios.post(`/api/friend/request/send/${user_id}`)
      checkFriendRequest()
    } catch(err) {
      console.log(err)
    }
  }
  
  const checkFriendRequest = async () => {
    const {user_id} = props
    try{
      let res = await axios.get(`/api/friend/request/sent/${user_id}`)
      await setFriendRequests(res.data)
    } catch(err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    checkFriendRequest()
  }, [])

  return(
    <>
     {friendRequests[0] ? 
       <button><FontAwesomeIcon icon={faPaperPlane} />{' '}Request Sent</button>
     :
       <button onClick={() => sendFriendRequest()}><FontAwesomeIcon icon={faUserPlus} />{' '}Add Friend</button>
     }
    </>
  )
}

export default FriendAddButton