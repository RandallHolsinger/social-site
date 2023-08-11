import React, {useState, useEffect} from 'react'
import './Friends.scss'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../Navbar/Navbar'
import PageTitle from '../PageTitle/PageTitle'
import ProfileCard from '../ProfileCard/ProfileCard'
import NoContentMessage from '../NoContentMessage/NoContentMessage'
import Loader from '../Loader/Loader'

export interface IFriend {
  user_id: number,
  first_name: string,
  last_name: string,
  dob?: string,
  city?: string,
  state_province?: string,
  occupation?: string,
  profile_img?: string,
  friend_id: number,
  source_id: number,
  target_id: number,
  friend_status: string,
  date: string
}

export const Friends: React.FC = () => {

  const [friends, setFriends] = useState<IFriend[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getFriends = async () => {
    try {
      let res = await axios.get('/api/friends')
      setFriends(res.data)
      setIsLoading(false)
    } catch(err) {
      console.log(err)
    }
  }

  const updateFriendNotifications = async () => {
    try {
      axios.put('/api/friends/notifications/update')
    } catch(err) {
      console.log(err)
    }
  }

  let mappedFriends = friends.map(friend => {
    return (
      <ProfileCard key={friend.friend_id} value={friend} getFriends={getFriends} />
    )
  })

  const renderFriends = () => {
    if(isLoading) {
      return(
        <Loader />
      )
    } else {
      if(friends[0]) {
        return (
          <div className="friends-container">
            {mappedFriends}
          </div>
        )
      } else {
        <NoContentMessage subject={'No friends to show'} />
      }
    }
  }

  useEffect(() => {
    getFriends()
    updateFriendNotifications()
    setIsLoading(true)
  }, [])

  return (
    <div className="Friends">
      <Navbar />
      <PageTitle icon={<FontAwesomeIcon icon={faUserGroup} />} title={'Friends'} />
      {renderFriends()}
    </div>
  )
}

export default Friends