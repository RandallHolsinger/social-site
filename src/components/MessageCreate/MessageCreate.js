import React, { useState, useEffect } from 'react'
import './MessageCreate.scss'
import axios from 'axios'
import Select from 'react-select'

function MessageCreate(props) {

  const {getMessageInbox, setShowCreateMessage} = props

  const [friends, setFriends] = useState([])
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [subjectInput, setSubjectInput] = useState('')
  const [messageInput, setMessageInput] = useState('')

  const resetInputs = () => {
    setSelectedFriend(null)
    setSubjectInput('')
    setMessageInput('')
  }

  const getFriends = async () => {
    try {
      let res = await axios.get('/api/friends')
      setFriends(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  const sendMessage = async () => {
    const user_id = selectedFriend.value
    const subject = subjectInput
    const message = messageInput
    console.log('Data ==>', user_id, subject, message)
    try {
      await axios.post(`/api/message/send/${user_id}`, {subject, message})
      setShowCreateMessage(false)
      getMessageInbox()
    } catch(err) {
      console.log(err)
    }
  }

  const handleSelectedFriend = (selectedFriend) => {
    setSelectedFriend(selectedFriend)
  }
  
  const options = friends.map(friend => {
    return {
      value: friend.user_id,
      label: `${friend.first_name} ${friend.last_name}`
    }
  })


  useEffect(() => {
    getFriends()
  }, [])

  return(
    <div className="MessageCreate">
      <label htmlFor='friends'>To:</label>
      <Select
        onClick={() => getFriends()}
        value={selectedFriend}
        onChange={handleSelectedFriend}
        options={options}
      />
      <label>Subject:</label>
      <input 
        type="text"
        placeholder='Subject'
        value={subjectInput}
        onChange={(e) => setSubjectInput(e.target.value)}
      />
      <label>Message:</label>
      <textarea value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder='Message...' />
      <button onClick={() => sendMessage()}>Send Message</button>
    </div>
  )
}

export default MessageCreate