import React, { useState } from 'react'
import './FriendAccept.scss'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faX, faUserGroup } from '@fortawesome/free-solid-svg-icons'  
import FriendDeleteButton from '../FriendDelete/FriendDelete'

function FriendAccept(props) {

  const [showIsFriend, setShowIsFriend] = useState(false)
  const [showDeleteFriend, setShowDeleteFriend] = useState(false)

  const {user_id, friend_id, status} = props

  const acceptFriendRequest = async () => {
    try {
      await axios.put(`/api/friend/accept/${user_id}`)
      setShowIsFriend(true)
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <div className="FriendAccept">
      {showIsFriend ?
        <div className='friend-tag-container'>
          <span className='friend-tag'>
            <FontAwesomeIcon icon={faUserGroup} className='friend-tag-icon' />
            Friends
          </span>
          {showDeleteFriend ?
            <span>
              <FriendDeleteButton friend_id={friend_id} />
            </span>
          :
            null
          }
        </div>
        
      :
        <div className="accept-decline-requests-container">
          <button onClick={() => acceptFriendRequest() } className='friend-accept-button'>
            <FontAwesomeIcon icon={faUserPlus} className='friend-accept-icon' />
            Accept Request
          </button>
          <button className="friend-decline-button">
            <FontAwesomeIcon icon={faX} className='friend-decline-icon' />
            Decline Request
          </button>
        </div>
      }
    </div>
  )
}

export default FriendAccept