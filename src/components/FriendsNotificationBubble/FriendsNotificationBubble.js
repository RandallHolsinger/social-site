import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import './FriendsNotificationBubble.scss'

function FriendsNotificationBubble(props) {
  
  const [friendNotifications, setFriendNotifications] = useState(0)

  const location = useLocation()

  const getFriendNotifications = async () => {
    try {
      let res = await axios.get('/friends/notifications')
      setFriendNotifications(res.data[0])
    } catch(err) {
      console.log(err)
    }
  }

  // useEffect(() => {
  //   getFriendNotifications()
  //   ga('send', 'pageview');
  // },[location])

  return (
    <>
      {friendNotifications ? 
        <span>{friendNotifications}</span>
      :
        null
      }
    </>
  )
}

export default FriendsNotificationBubble