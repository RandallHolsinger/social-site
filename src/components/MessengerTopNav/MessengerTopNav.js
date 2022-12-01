import React, { useState, useEffect } from 'react'
import './MessengerTopNav.scss'
import axios from 'axios'
import { useSelector } from 'react-redux'
import MessengerFriend from '../MessengerFriend/MessengerFriend'

function MessengerTopNav(props) {

  const {socket} = props
  
  const [friendsList, setFriendsList] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])
  const userID = useSelector(state => state.user.userId)
  
  
  const checkOnlineStatus = (friends) => {
    socket.emit('checkOnlineStatus', friends)
    socket.on('onlineStatus', (friendsArr) => {
      setOnlineFriends(friendsArr)
    })
  }
  
  const getMessengerFriendList = async () => {
    try {
      let res = await axios.get('/api/friends/list')
      checkOnlineStatus(res.data)
      setFriendsList(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getMessengerFriendList()
  }, [])

  let mappedFriendChatList = friendsList.map(friend => {
    let found = onlineFriends.some(onlineFriend => onlineFriend.userId == friend.user_id)
    return(
      <MessengerFriend 
        key={friend.friend_id}
        value={friend}
        status={found ? 'online' : 'offline'}
      />
    )
  })

  return(
    <div className="MessengerTopNav">
      {mappedFriendChatList}
    </div>
  )
}

export default MessengerTopNav 