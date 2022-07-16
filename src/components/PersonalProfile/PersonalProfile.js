import React from 'react'
import ProfileHeader from '../ProfileHeader/ProfileHeader'
import UserInfo from '../UserInfo/UserInfo'
import UserPosts from '../UserPosts/UserPosts'


function PersonalProfile() {

  return(
    <div className="PersonalProfile">
      <ProfileHeader />
      <UserInfo style={'user-info-mobile'} />
      <UserPosts />
    </div>
  )
}

export default PersonalProfile