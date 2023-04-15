import React, { useState, useEffect } from 'react'
import './MessageInbox.scss'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../Navbar/Navbar'
import MessageInboxItem from '../MessageInboxItem/MessageinboxItem'
import MessageCreate from '../MessageCreate/MessageCreate'
import PageTitle from '../PageTitle/PageTitle'
import { Link } from 'react-router-dom'



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
      <Link to={`/Messages/${inboxItem.conversation_id}`} key={inboxItem.inbox_id} className='messages-link'>
        <MessageInboxItem value={inboxItem}/>
      </Link>
    )
  })

  return(
    <div className="MessageInbox">
      <Navbar />
      <PageTitle icon={<FontAwesomeIcon icon={faEnvelope} />} title={'Message Inbox'} />
      <button onClick={() => setShowCreateMessage(!showCreateMessage)}>Create Message</button>
      {showCreateMessage ? <MessageCreate getMessageInbox={getMessageInbox} setShowCreateMessage={setShowCreateMessage} /> : null}
      {mappedMessageInbox}
    </div>
  )
}

export default MessageInbox