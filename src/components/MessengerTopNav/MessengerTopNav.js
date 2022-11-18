import React, { useState, useEffect } from 'react'
import './MessengerTopNav.scss'
import axios from 'axios'

function MessengerTopNav(props) {

  const {socket} = props

  const [messengerFriendList, setMessengerFriendList] = useState([])
  
  const getMessengerFriendList = async () => {
    console.log('hitting function')
    try {
      let res = await axios.get('/api/friends')
      setMessengerFriendList(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  const checkOnlineStatus = () => {
      console.log('sending friends to server now!!!', messengerFriendList[0])
        socket.emit('checkOnlineStatus', messengerFriendList)
  }
  
  
  useEffect(() => {
    getMessengerFriendList()
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