import React, {useState, useEffect} from 'react'
import './Friends.scss'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import ProfileCard from '../ProfileCard/ProfileCard'

function Friends() {

  const [friends, setFriends] = useState([])

  const getFriends = async () => {
    try {
      let res = await axios.get('/api/friends')
      setFriends(res.data)
      console.log('friends ==>', res.data)
    } catch(err) {
      console.log(err)
    }
  }

  let mappedFriends = friends.map(friend => {
    return (
      <ProfileCard key={friend.friend_id} value={friend} />
    )
  })

  useEffect(() => {
    getFriends()
  }, [])

  return (
    <div className="Friends">
      <Navbar />
      <div className="friends-container">
        {mappedFriends}
      </div>
    </div>
  )
}

export default Friends