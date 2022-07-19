import React from 'react'
import ProfileHeader from '../ProfileHeader/ProfileHeader'
import UserInfo from '../UserInfo/UserInfo'
import UserPosts from '../UserPosts/UserPosts'
import Navbar from '../Navbar/Navbar'
import { useSelector } from 'react-redux'

function PersonalProfile() {
  
  const userId = useSelector(state => state.user.userId)

  return(
    <div className="PersonalProfile">
      <ProfileHeader />
      <UserInfo user_id={userId}/>
      <UserPosts />
      <Navbar />
    </div>
  )
}

export default PersonalProfile