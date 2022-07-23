import React, { useState, useEffect } from 'react'
import './Friends.scss'
import axios from 'axios'
import Search from '../Search/Search'
import FriendRequest from '../FriendRequest/FriendRequest'
import Friend from '../Friend/Friend'
import Navbar from '../Navbar/Navbar'

function Friends() {
  
  const [friendRequests, setFriendRequests] = useState([])
  const [friends, setFriends] = useState([])

  const getFriends = async () => {
    try {
      let res = await axios.get('/api/friends')
      console.log('List of Friends ==> ', res)
      setFriends(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  const getFriendRequests = async () => {
    try {
      let res = await axios.get('/api/friend/requests')
      console.log('friend requests ==>', res)
      setFriendRequests(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getFriendRequests()
    getFriends()
  }, [])
  
  let mappedFriendRequests = friendRequests.map(request => {
    return(
      <FriendRequest key={request.friend_id} value={request} getFriends={getFriends}/>
    )
  })

  let mappedFriends = friends.map(friend => {
    return(
      <Friend key={friend.friend_id} value={friend} />
    )
  })

  return(
    <div className="Friends">
      <section>
        <Search />
        {mappedFriendRequests}
        {mappedFriends}
        <Navbar />
      </section>
    </div>
  )
}

export default Friends