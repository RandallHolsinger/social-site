import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import './FriendStatus.scss'
import axios from 'axios'
import FriendSendButton from '../FriendSendButton/FriendSendButton'
import FriendAcceptButton from '../FriendAcceptButton/FriendAcceptButton'

function FriendStatus(props) {

  const userId = useSelector(state => state.user.userId)

  const [userInfo, setUserInfo] = useState([])

  // Need to be able to toggle the state of the buttons and save on page refresh
  // and Rerender with updated results from database
  const friendStatusLogic = () => {}

  const getFriendStatus = async (userId) => {
    try {
      let res = await axios.get(`/api/friend/status/${userId}`)
      setUserInfo(res.data)
    } catch(err) {
      console.log(err)
    }
    console.log('here is the response', userInfo)
  }

  useEffect(() => {
    getFriendStatus()
  }, [])

  return(
    <div className="FriendStatus">
      {friendStatusLogic()}
    </div>
  )
}

export default FriendStatus