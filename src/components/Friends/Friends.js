import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import Friend from '../Friend/Friend'

function Friends() {

  const [friends, setFriends] = useState([])

  const getFriends = async () => {
    try {
      let res = await axios.get('/api/friends')
      setFriends(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  let mappedFriends = friends.map(friend => {
    return (
      <Friend key={friend.friend_id} value={friend} />
    )
  })

  useEffect(() => {
    getFriends()
  }, [])

  return (
    <div className="Friends">
      <Navbar />
        {mappedFriends}
    </div>
  )
}

export default Friends