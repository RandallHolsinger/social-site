import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import './FriendsNotificationBubble.scss'

function FriendsNotificationBubble(props) {
  
  const [friendNotifications, setFriendNotifications] = useState(0)

  const location = useLocation()

  const getFriendNotifications = async () => {
    try {
      let res = await axios.get('/api/friends/notifications')
      setFriendNotifications(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getFriendNotifications()
  },[])

  return (
    <>
      {friendNotifications ? 
        
        <span className='bubble'>
          {friendNotifications}
        </span>
      :
        null
      }
    </>
  )
}

export default FriendsNotificationBubble