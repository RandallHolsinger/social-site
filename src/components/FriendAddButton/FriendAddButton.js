import React, { useState, useEffect } from 'react'
import './FriendAddButton.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import axios from 'axios'

function FriendAddButton(props) {
  
  const [friendStatus, setFriendStatus] = useState([])
  
  const userId = useSelector(state => state.user.userId)

  const sendFriendRequest = async () => {
    const {user_id} = props
    console.log('user id from profile ==>', user_id)
    try {
      axios.post(`/api/friend/request/send/${user_id}`)
      getFriendStatus() 
    } catch(err) {
      console.log(err)
    }
  }
  
  const getFriendStatus = async () => {
    const {user_id} = props
    try{
      let res = await axios.get(`/api/friend/status/${user_id}`)
      await setFriendStatus(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  // => refactor request sent  
  // => toggle state saving visual changes  
  // => see if setting flag in database and refreshing profiles works...
  const renderButton = () => {
    console.log('here ==> ', friendStatus)
    if(props.user_id === userId) {
      return <span>MyProfile</span>
    } else if(friendStatus.friendStatus == "pending") {
      return <span><FontAwesomeIcon icon={faPaperPlane} />Request sent</span>
    } else {
      return <button onClick={() => sendFriendRequest()}><FontAwesomeIcon icon={faUserPlus} />{' '}Add Friend</button>
    }
  }
  
  useEffect(() => {
    getFriendStatus()
  }, [])

  return(
    <>
      {renderButton()}
    </>
  )
}

export default FriendAddButton