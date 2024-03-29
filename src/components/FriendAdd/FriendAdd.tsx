import React, { useState } from 'react'
import './FriendAdd.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

interface FriendAddProps {
  user_id: number
}

export const FriendAdd: React.FC<FriendAddProps> = (props) => {
  
  const { user_id } = props
  
  const [showRequestSent, setShowRequestSent] = useState(false)
  
  
  const sendFriendRequest = async () => {
    try {
      await axios.post(`/api/friend/send/${user_id}`)
      setShowRequestSent(true)
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <div className="FriendAdd">
      {showRequestSent ?
        <span className='request-sent'>
          <FontAwesomeIcon icon={faPaperPlane} className='request-sent-icon' />
          Request Sent
        </span>
      :
        <button onClick={() => sendFriendRequest()} className='add-friend-button' >
          <FontAwesomeIcon icon={faUserPlus} className='add-friend-icon' />
          Add Friend
        </button>
      }
    </div>
  )
}

export default FriendAdd