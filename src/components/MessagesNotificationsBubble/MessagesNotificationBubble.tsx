import React, {useState, useEffect} from 'react'
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
     <span className='bubble'>
       {MessageNotifications}
     </span>
    </>
  )
}

export default MessageNotificationsBubble