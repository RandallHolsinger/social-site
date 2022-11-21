import React, { useState, useEffect } from 'react'
import './MessengerTopNav.scss'
import axios from 'axios'

function MessengerTopNav(props) {

  const {socket} = props

  const [messengerFriendList, setMessengerFriendList] = useState([])
  const [friendsListUpdated, setFriendsListUpdate] = useState(false)
  const [onlineFriends, setOnlineFriends] = useState([])
  
  const getMessengerFriendList = async () => {
    console.log('hitting function')
    try {
      let res = await axios.get('/api/friends/list')
      setMessengerFriendList(res.data)
      setFriendsListUpdate(true)
    } catch(err) {
      console.log(err)
    }
  }

  const checkOnlineStatus = () => {
        console.log('sending friends to server now!!!', messengerFriendList[0])
        socket.emit('checkOnlineStatus', messengerFriendList)
        socket.on('onlineStatus', (onlineUsers) => {
          setOnlineFriends(onlineUsers)
        })
        console.log('online friend here ==>', onlineFriends)
  }

  useEffect(() => {
    getMessengerFriendList()
    checkOnlineStatus()
  }, [friendsListUpdated, socket])

  let mappedOnlineFriends = onlineFriends.map(onlineFriend => {
    return (
      <div key={onlineFriend.friend_id} className="messenger-friend-container">
        <span>{onlineFriend.first_name}{' '}{onlineFriend.last_name}</span>
      </div>
    )
  })

  console.log('here are your online friends ==>', onlineFriends)
  return(
    <div className="MessengerTopNav">
      {mappedOnlineFriends}
    </div>
  )
}

export default MessengerTopNav 