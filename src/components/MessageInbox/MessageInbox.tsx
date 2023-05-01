import React, { useState, useEffect } from 'react'
import './MessageInbox.scss'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../Navbar/Navbar'
import MessageInboxItem from '../MessageInboxItem/MessageinboxItem'
import MessageCreate from '../MessageCreate/MessageCreate'
import PageTitle from '../PageTitle/PageTitle'

export interface IMessageInbox {
  inbox_id: number,
  owner_id: number,
  conversation_id: number,
  friend_uid: number,
  last_sent_id: number
  last_subject: string,
  last_message: string,
  date: string,
  user_id: number,
  first_name: string,
  last_name: string,
  profile_img?: string
}

export const MessageInbox: React.FC = () => {

  const [messageInbox, setMessageInbox] = useState<IMessageInbox[]>([])
  const [showCreateMessage, setShowCreateMessage] = useState(false)

  const getMessageInbox = async () => {
    try {
      let res = await axios.get('/api/message/inbox')
      setMessageInbox(res.data)
    } catch(err) {
      console.log(err)
    }
  }
  
  console.log('messageInbox ==>', messageInbox)
  useEffect(() => {
    getMessageInbox()
  }, [])
  
  let mappedMessageInbox = messageInbox.map(inboxItem => {
    return(
      <MessageInboxItem key={inboxItem.inbox_id} value={inboxItem}/>
    )
  })

  return(
    <div className="MessageInbox">
      <Navbar />
      <PageTitle icon={<FontAwesomeIcon icon={faEnvelope} />} title={'Message Inbox'} />
      <div className="message-inbox-toolbar">
        <button onClick={() => setShowCreateMessage(!showCreateMessage)}  className='create-message-button'>
          <FontAwesomeIcon icon={faPenToSquare} className='create-message-button-icon' />
          Create Message
        </button>
      </div>
      {showCreateMessage ? <MessageCreate messageInbox={messageInbox} getMessageInbox={getMessageInbox} setShowCreateMessage={setShowCreateMessage} /> : null}
      {mappedMessageInbox}
    </div>
  )
}

export default MessageInbox