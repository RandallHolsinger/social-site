import React from 'react'
import ProfileHeader from '../ProfileHeader/ProfileHeader'
import UserInfo from '../UserInfo/UserInfo'
import Posts from '../Posts/Posts'
import Navbar from '../Navbar/Navbar'
import { useSelector } from 'react-redux'

function PersonalProfile() {
  
  const userId = useSelector(state => state.user.userId)

  return(
    <div className="PersonalProfile">
      <Navbar />
      <ProfileHeader />
      <UserInfo user_id={userId}/>
      <Posts user_id={userId}/>
    </div>
  )
}

export default PersonalProfile