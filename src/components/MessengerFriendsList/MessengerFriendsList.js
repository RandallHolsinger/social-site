import React, { useState, useEffect } from 'react'
import './MessengerFriendsList.scss'
import axios from 'axios'
import { useSelector } from 'react-redux'
import MessengerFriendOffline from '../MessengerFriendOffline/MessengerFriendOffline'

function MessengerFriendsList(props) {

  const {socket, setShowMessenger} = props
  
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

  // need to create a merged array with both online users and offline users and map
  // over the new array. then create comparison to render online and offline 
  // users correctly.
  let mappedFriendChatList = friendsList.map(friend => {
    let onlineUser = onlineFriends.some(onlineFriend => onlineFriend.userId == friend.user_id)
    return(
      <MessengerFriendOffline
        key={friend.friend_id}
        value={friend}
        status={onlineUser ? 'online' : 'offline'}
      />
    )
  })

  return(
    <div className="MessengerFriendsList">
      <div>
        <h3>Friends Online</h3>
        <button onClick={() => setShowMessenger(false)}>close</button>
      </div>
      {mappedFriendChatList}
    </div>
  )
}

export default MessengerFriendsList 