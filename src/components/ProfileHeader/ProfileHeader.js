import React from 'react'
import './ProfileHeader.scss'

function ProfileHeader(props) {
  return(
    <div className="ProfileHeader">
      <header>
        <img src={'./images/user-image-default-white.svg'} alt="profile" />
        <span>user's name here</span>
      </header>
    </div>
  )
}

export default ProfileHeader