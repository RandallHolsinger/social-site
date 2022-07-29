import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { faInbox } from '@fortawesome/free-solid-svg-icons'
import MessageInboxItem from '../MessageInboxItem/MessageinboxItem'

function MessageInbox() {

  const [messageInbox, setMessageInbox] = useState([])
  
  //create server endpoint 
  const getMessageInbox = async () => {
    try {
      let res = await axios.get('/api/message/inbox')
      setMessageInbox(res)
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
      {mappedMessageInbox}
    </div>
  )
}