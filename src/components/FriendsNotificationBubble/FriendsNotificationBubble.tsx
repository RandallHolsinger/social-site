import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './FriendsNotificationBubble.scss'


export const FriendsNotificationBubble: React.FC = () => {
  
  const [friendNotifications, setFriendNotifications] = useState(0)

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
        <span className='friend-notification-bubble'>
          {friendNotifications}
        </span>
      :
        null
      }
    </>
  )
}

export default FriendsNotificationBubble