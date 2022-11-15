import React, { useState, useEffect } from 'react'
import './MessengerTopNav.scss'
import axios from 'axios'

function MessengerTopNav(props) {

  const [messengerFriendList, setmessengerFriendList] = useState([])
  const [selectedFriend, setSelectedFriend] = useState(0)
  
  const getmessengerFriendList = async () => {
    try {
      let res = await axios.get('/api/friends')
      setmessengerFriendList(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  
  useEffect(() => {
    getmessengerFriendList()
  }, [])

  let mappedmessengerFriendList = messengerFriendList.map(messengerFriend => {
    return (
      <div key={messengerFriend.friend_id} className="messenger-friend-container">
        <span>{messengerFriend.first_name}{' '}{messengerFriend.last_name}</span>
      </div>
    )
  })

  return(
    <div className="MessengerTopNav">
      {mappedmessengerFriendList}
    </div>
  )
}

export default MessengerTopNav 