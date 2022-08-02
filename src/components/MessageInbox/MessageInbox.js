import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MessageInboxItem from '../MessageInboxItem/MessageinboxItem'
// change location of MessageCreate
import MessageCreate from '../MessageCreate/MessageCreate'
function MessageInbox() {

  const [messageInbox, setMessageInbox] = useState([])
  
  //create server endpoint 
  const getMessageInbox = async () => {
    try {
      let res = await axios.get('/api/message/inbox')
      setMessageInbox(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getMessageInbox()
  }, [])
  
  let mappedMessageInbox = messageInbox.map(inboxItem => {
    return(
      <MessageInboxItem key={inboxItem.message_id} value={inboxItem} />
    )
  })

  return(
    <div className="MessageInbox">
      <MessageCreate />
      {mappedMessageInbox}
    </div>
  )
}

export default MessageInbox