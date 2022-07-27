import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import './FriendStatus.scss'
import axios from 'axios'
import FriendAddButton from '../FriendAddButton/FriendAddButton'
import FriendAcceptButton from '../FriendAcceptButton/FriendAcceptButton'

function FriendStatus(props) {

  const [requestsSent, setRequestsSent] = useState([])
  const [requestsRecieved, setRequestsRecieved] = useState([])

  const userId = useSelector(state => state.user.userId)

  const getRequestsSent = async () => {
    const {user_id} = props
    try {
      let res = await axios.get(`/api/friend/status/${user_id}`)
      setRequestsSent(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  const getRequestsRecieved = async () => {
    const {user_id} = props
    try {
      let res = await axios.get(`/api/friend/request/${user_id}`)
      setRequestsRecieved(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  const friendStatusLogic = () => {
    if(userId === props.user_id) {
      return <span>My Profile</span>
    } else if(requestsSent[0]) {
      return <span><FontAwesomeIcon icon={faPaperPlane} />Request Sent</span>
    } else if(!requestsSent[0]){
      return <FriendAddButton user_id={props.user_id} getRequestsSent={getRequestsSent}/>
    } else if(requestsRecieved[0]) {
      return <FriendAcceptButton user_id={props.user_id} getRequestsRecieved={getRequestsRecieved}/>
    }
  }

  useEffect(() => {
    getRequestsSent()
    getRequestsRecieved()
  }, [])

  return(
    <div className="FriendStatus">
      {friendStatusLogic()}
    </div>
  )
}

export default FriendStatus