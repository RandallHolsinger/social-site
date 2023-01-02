import React, { useState, useEffect } from 'react'
import './ProfileHeader.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPencil } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import ImageUploader from '../ImageUploader/ImageUploader'

function ProfileHeader(props) {

  const {user, getUserInfo} = props
  
  const [profileImageData, setProfileImageData] = useState({})
  const [showImageUploader, setShowImageUploader] = useState(false)

  const updateProfileImage = async () => {
    try {
      axios.put('/api/user/update/profile/image', profileImageData)
      setShowImageUploader(false)
      getUserInfo()
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    console.log('here is the user =>', user)
  })

  return(
    <div className="ProfileHeader">
      <div className="user-header-info">
        <div className='user-image-header-container'>
          <span onClick={() => setShowImageUploader(true)} className='header-image-edit-icon'>
            <FontAwesomeIcon icon={faPencil} />
          </span>
          {user.profile_img ?
            <img src={`/uploads/images/${user.profile_img}`} className='profile-user-image' alt='profile' />
          :
            <FontAwesomeIcon icon={faUser} className='header-user-icon' />
          }
        </div>
        <div className="header-user-details">
          <span className='header-username'>
            {user.first_name}{' '}{user.last_name}
          </span>
        </div>
      </div>
      {showImageUploader ?
        <div className='image-upload-modal'>
          <ImageUploader setProfileImageData={setProfileImageData} type={'profile_image'} />
          <div className="upload-user-image-buttons">
            <button onClick={() => updateProfileImage()} className='save-user-image'>Save</button>
            <button onClick={() => setShowImageUploader(false)} className='cancel-user-image'>Cancel</button>
          </div>
        </div>
      :
        null
      }
    </div>
  )
}

export default ProfileHeader