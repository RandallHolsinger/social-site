import React from 'react'
import './ProfileHeader.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPencil } from '@fortawesome/free-solid-svg-icons'

function ProfileHeader(props) {
  return(
    <div className="ProfileHeader">
      <span className='user-image-header-container'>
        <span><FontAwesomeIcon icon={faPencil} /></span>
        <FontAwesomeIcon icon={faUser} className='header-user-icon' />
      </span>
    </div>
  )
}

export default ProfileHeader