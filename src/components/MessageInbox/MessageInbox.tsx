import React, { useState, useEffect } from 'react'
import './MessageInbox.scss'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../Navbar/Navbar'
import MessageInboxItem from '../MessageInboxItem/MessageinboxItem'
import MessageCreate from '../MessageCreate/MessageCreate'
import PageTitle from '../PageTitle/PageTitle'
import NoContentMessage from '../NoContentMessage/NoContentMessage'
import Loader from '../Loader/Loader'

export interface IMessageInbox {
  inbox_id: number,
  owner_id: number,
  conversation_id: number,
  friend_uid: number,
  last_sent_id: number
  last_subject: string,
  last_message: string,
  seen?:  boolean, 
  date: string,
  user_id: number,
  first_name: string,
  last_name: string,
  profile_img?: string
}

export const MessageInbox: React.FC = () => {

  const [messageInbox, setMessageInbox] = useState<IMessageInbox[]>([])
  const [showCreateMessage, setShowCreateMessage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getMessageInbox = async () => {
    try {
      let res = await axios.get('/api/message/inbox')
      setMessageInbox(res.data)
      setIsLoading(false)
    } catch(err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    getMessageInbox()
    setIsLoading(true)
  }, [])
  
  let mappedMessageInbox = messageInbox.map(inboxItem => {
    return(
      <MessageInboxItem key={inboxItem.inbox_id} value={inboxItem}/>
    )
  })

  const renderInbox = () => {
    if(isLoading) {
      return(
        <Loader />
      )
    } else {
      if(messageInbox[0]) {
        return(
          <div className='message-inbox-container'>
              {mappedMessageInbox}
          </div>
        )
      } else {
        return (
          <NoContentMessage subject={'No Messages'} />
        )
      }
    }
  }

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
      {showCreateMessage ? <MessageCreate  getMessageInbox={getMessageInbox} setShowCreateMessage={setShowCreateMessage} /> : null}
      {renderInbox()}
    </div>
  )
}

export default MessageInbox