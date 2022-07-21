import React, { useState, useEffect } from 'react'
import './Friends.scss'
import axios from 'axios'
import Search from '../Search/Search'
import Friend from '../Friend/Friend'
import Navbar from '../Navbar/Navbar'

function Friends() {

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

  useEffect(() => {
    getFriends()
  }, [])

  let mappedFriends = friends.map(friend => {
    return(
      <Friend key={friend.friend_id} value={friend} />
    )
  })

  return(
    <div className="Friends">
      <section>
        <Search />
        {mappedFriends}
        <Navbar />
      </section>
    </div>
  )
}

export default Friends