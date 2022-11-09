import React, { useState, useEffect } from 'react'
import './MessageInbox.scss'
import axios from 'axios'
import MessageInboxItem from '../MessageInboxItem/MessageinboxItem'
import MessageCreate from '../MessageCreate/MessageCreate'
import Search from '../Search/Search'
import Navbar from '../Navbar/Navbar'



function MessageInbox() {

  const [messageInbox, setMessageInbox] = useState([])
  const [showCreateMessage, setShowCreateMessage] = useState(false)

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

  console.log('message inbox here ==>', messageInbox)

  return(
    <div className="MessageInbox">
      <Search />
      <button onClick={() => setShowCreateMessage(!showCreateMessage)}>Create Message</button>
      {showCreateMessage ? <MessageCreate /> : null}
      {mappedMessageInbox}
      <Navbar />
    </div>
  )
}

export default MessageInbox