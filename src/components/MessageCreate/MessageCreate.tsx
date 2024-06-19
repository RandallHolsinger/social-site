import React, { useState, useEffect, SetStateAction } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import './MessageCreate.scss'
import axios from 'axios'
import { IFriend as IMessageCreate } from '../Friends/Friends'
import FriendListItem from '../FriendListItem/FriendListItem'

interface MessageCreateProps {
  getMessageInbox: () => Promise<void>,
  setShowCreateMessage: React.Dispatch<SetStateAction<boolean>>
}

export const MessageCreate: React.FC<MessageCreateProps> = (props) => {

  const { getMessageInbox, setShowCreateMessage } = props

  const [friends, setFriends] = useState<IMessageCreate[]>([])
  const [selectedFriend, setSelectedFriend] = useState('')
  const [selectedFriendId, setSelectedFriendId] = useState(0)
  const [showFriendsList, setShowFriendsList] = useState(false)
  const [subjectInput, setSubjectInput] = useState('')
  const [messageInput, setMessageInput] = useState('')

  const resetInputs = () => {
    setSelectedFriend('')
    setSubjectInput('')
    setMessageInput('') 
  }

  const getFriendsList = async () => {
    try {
      let res = await axios.get('/api/friends/list')
      setFriends(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  const sendMessage = async () => {
    const user_id = selectedFriendId
    const subject = subjectInput
    const message = messageInput
    try {
      await axios.post(`/api/message/send/${user_id}`, {subject, message})
      setShowCreateMessage(false)
      getMessageInbox()
    } catch(err) {
      console.log(err)
    }
    resetInputs()
  }

  const handleSelectedFriend = (id: number, firstName: string, lastName: string) => {
    setSelectedFriend(firstName + ' ' + lastName)
    setSelectedFriendId(id)
    setShowFriendsList(false)
  }

  const mappedFriendsList = friends.map(friend => {
    return (
      <FriendListItem key={friend.friend_id} friend={friend} handleSelectedFriend={handleSelectedFriend}/>
    )
  })


  useEffect(() => {
    getFriendsList()
    getMessageInbox()
  }, [])

  return(
    <div className="MessageCreate">
      <div className="message-create-header">
        <FontAwesomeIcon icon={faEnvelope} className='message-create-header-icon'/>
        <h2>Create Message</h2>
      </div>
      <label htmlFor='friends'>To:</label>
      <input
        onClick={() => setShowFriendsList(true)}
        value={selectedFriend}
        placeholder='Friend'
        className='select-friend-input'
      />
      {showFriendsList ? 
        <div className="friend-list-dropdown">
          {mappedFriendsList}
        </div>
      :
        null
      }

      <label>Subject:</label>
      <input 
        type="text"
        placeholder='Subject'
        value={subjectInput}
        onChange={(e) => setSubjectInput(e.target.value)}
        className='subject-input'
      />
      <label>Message:</label>
      <textarea 
        value={messageInput}
        rows={15} 
        onChange={(e) => setMessageInput(e.target.value)} 
        placeholder='Write your message here'
        className='message-input' 
      />
      <div className='message-create-buttons'>
        <button onClick={() => setShowCreateMessage(false)} className='message-cancel'>
          Cancel
        </button>
        <button onClick={() => sendMessage()} className='message-send-button'>
          <FontAwesomeIcon icon={faPaperPlane} className='message-send-icon' />
          Send Message
        </button>
      </div>
    </div>
  )
}

export default MessageCreate