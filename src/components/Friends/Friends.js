import React, {useState, useEffect} from 'react'
import './Friends.scss'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../Navbar/Navbar'
import PageTitle from '../PageTitle/PageTitle'
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
      <PageTitle icon={<FontAwesomeIcon icon={faUserGroup} />} title={'Friends'} />
      <div className="friends-container">
        {mappedFriends}
      </div>
    </div>
  )
}

export default Friends