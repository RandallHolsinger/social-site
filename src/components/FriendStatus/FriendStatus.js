import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { faPersonCirclePlus } from '@fortawesome/free-solid-svg-icons'
import FriendAddButton from '../FriendAddButton/FriendAddButton'
import FriendAcceptButton from '../FriendAcceptButton/FriendAcceptButton'

function FriendStatus(props) {

  const [friendStatus, setFriendStatus] = useState([])
  
  const currentUserId =  useSelector(state => state.user.userId)
  const {user_id} = props

  const getFriendStatus = async (user_id) => {
    try {
      let res = await axios.get(`/api/friend/status/${user_id}`)
      setFriendStatus(res.data[0])
    } catch(err) {
      console.log(err)
    }
  }
  
  const friendStatusLogic = () => {
    if(friendStatus) {
      if(friendStatus.source_id === currentUserId) {
        return <p>Request Sent</p>
      } else if(friendStatus.source_id === user_id) {
        return <FriendAcceptButton user_id={user_id} friend_id={friendStatus.friend_id} />
      } else if(friendStatus.friend_status === 'friend') {
        return <p>Friends</p>
      }
    } else {
      return <FriendAddButton user_id={user_id} />
    }
  }
      
      useEffect(() => {
        getFriendStatus(user_id)
      }, [])
      
  return(
    <div className="FriendStatus">
      {friendStatusLogic()}
    </div>
  )
}

export default FriendStatus 