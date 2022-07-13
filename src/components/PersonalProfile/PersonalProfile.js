import React, { useState } from 'react'
import ProfileHeader from '../ProfileHeader/ProfileHeader'
function PersonalProfile() {

  const [userPosts, setUserPosts] = useState([])

  return(
    <div className="PersonalProfile">
      <ProfileHeader />
    </div>
  )
}

export default PersonalProfile