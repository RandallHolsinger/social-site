import React from 'react'
import ProfileHeader from '../ProfileHeader/ProfileHeader'
import UserInfo from '../UserInfo/UserInfo'
import CreatePost from '../CreatePost/CreatePost'
import UserPosts from '../UserPosts/UserPosts'


function PersonalProfile() {

  return(
    <div className="PersonalProfile">
      <ProfileHeader />
      <UserInfo style={'user-info-mobile'} />
      <CreatePost />
      <UserPosts />
    </div>
  )
}

export default PersonalProfile