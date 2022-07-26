import React, { useState, useEffect } from 'react'
import axios from 'axios'

function MessageInbox() {

  const [messageInbox, setMessageInbox] = useState([])

  const getMessageInbox = async () => {
    try {
      let res = await axios.get('/api/message/inbox')
      setMessageInbox(res)
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <div className="MessageInbox">
      MessageInbox
    </div>
  )
}