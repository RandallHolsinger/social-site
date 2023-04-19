import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './MessageCreate.scss'
import axios from 'axios'

function MessageCreate(props) {

  const {getMessageInbox, setShowCreateMessage} = props

  const [friends, setFriends] = useState([])
  const [selectedFriend, setSelectedFriend] = useState('')
  const [selectedFriendId, setSelectedFriendId] = useState(0)
  const [showFriendsList, setShowFriendsList] = useState(false)
  const [subjectInput, setSubjectInput] = useState('')
  const [messageInput, setMessageInput] = useState('')

  const resetInputs = () => {
    setSelectedFriend(null)
    setSubjectInput('')
    setMessageInput('') 
  }

  const getFriendsList = async () => {
    try {
      let res = await axios.get('/api/friends/list')
      setFriends(res.data)
      console.log(res.data)
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
    console.log('message inbox here =>', props.messageInbox)
  }

  const handleSelectedFriend = (id, firstName, lastName) => {
    console.log(id, firstName, lastName)
    setSelectedFriend(firstName + ' ' + lastName)
    setSelectedFriendId(id)
    setShowFriendsList(false)
  }

  useEffect(() => {
    console.log('selected friend =>', selectedFriend)
    console.log('get message inbox =>', props.messageInbox)
  }, [selectedFriend])
  
  const mappedFriendsList = friends.map(friend => {
    return (
      <div key={friend.friend_id} onClick={() => handleSelectedFriend(friend.user_id, friend.first_name, friend.last_name )} className="friend-list-item">
        <div className="select-friend-img-container">
          {friend.profile_img ?
            <img src={`/uploads/images/${friend.profile_img}`} alt='profile' className='friend-list-profile-img'/>
          :
            <FontAwesomeIcon icon={faUser} className='friend-list-default-img' /> 
          }
        </div>
        <span className='dropdown-list-name'>{friend.first_name}{' '}{friend.last_name}</span>
      </div>
    )
  })


  useEffect(() => {
    getFriendsList()
    getMessageInbox()
  }, [])

  return(
    <div className="MessageCreate">
      <label htmlFor='friends'>To:</label>
      <input
        onClick={() => setShowFriendsList(true)}
        value={selectedFriend}
        onChange={handleSelectedFriend}
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
      />
      <label>Message:</label>
      <textarea value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder='Message...' />
      <div className='message-create-buttons'>
        <button onClick={() => sendMessage()} className='message-send-button'>Send Message</button>
        <button onClick={() => setShowCreateMessage(false)} className='message-cancel-button'>Cancel</button>
      </div>
    </div>
  )
}

export default MessageCreate