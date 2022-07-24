import React, { useState, useEffect } from 'react'
import './FriendAddButton.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import axios from 'axios'

function FriendAddButton(props) {
  
  const [friendRequests, setFriendRequests] = useState([])
  
  const userId = useSelector(state => state.user.userId)

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


  const renderButton = () => {
    console.log('userId ==> ', userId)
    if(props.user_id === userId) {
      return <span>MyProfile</span>
    } else if(friendRequests[0]) {
      return <span><FontAwesomeIcon icon={faPaperPlane} />Request sent</span>
    } else {
      return <button onClick={() => sendFriendRequest()}><FontAwesomeIcon icon={faUserPlus} />{' '}Add Friend</button>
    }
  }
  
  useEffect(() => {
    checkFriendRequest()
  }, [])

  return(
    <>
      {renderButton()}
    </>
  )
}

export default FriendAddButton