import React, { useState } from 'react'
import ProfileHeader from '../ProfileHeader/ProfileHeader'
import UserInfo from '../UserInfo/UserInfo'


function PersonalProfile() {

  const [userPosts, setUserPosts] = useState([])

  return(
    <div className="PersonalProfile">
      <ProfileHeader />
      <UserInfo style={'user-info-mobile'} />
    </div>
  )
}

export default PersonalProfile