import React, {useState, useEffect} from 'react'
import './MessagesNotificationBubble.scss'
import axios from 'axios'

export const MessageNotificationsBubble: React.FC = () => {
  
  const [MessageNotifications, setMessageNotifications] = useState(0)

  const getMessageNotifications = async () => {
    try {
      let res = await axios.get('/api/message/notifications')
      setMessageNotifications(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getMessageNotifications()
  }, [])

  return (
    <>
      {MessageNotifications ?
        <span className='message-notification-bubble'>
          {MessageNotifications}
        </span>
      :
        null
      }
    </>
  )
}

export default MessageNotificationsBubble