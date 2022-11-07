import React, { useState } from 'react'
import axios from 'axios'

function MessageCreate() {

  const [friends, setFriends] = useState([])
  const [subjectInput, setSubjectInput] = useState('')
  const [messageInput, setMessageInput] = useState('')

  const getFriends = async () => {
    try {
      let res = await axios.get('/api/friends')
      setFriends(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  const mappedFriends = friends.map(friend => {
    return(
      <option key={friend.friend_id}>{friend.first_name}{' '}{friend.last_name}</option>
    )
  })

  console.log('friends ==>', friends)

  return(
    <div className="MessageCreate">
      <label htmlFor='friends'>Select A Friend</label>
      <select name='friends' onClick={() => getFriends()}>{mappedFriends}</select>
      <input 
        type="text"
        placeholder='Subject'
        value={subjectInput}
        onChange={(e) => setSubjectInput(e.target.value)}
      />
      <textarea value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder='Message...' />
    </div>
  )
}

export default MessageCreate