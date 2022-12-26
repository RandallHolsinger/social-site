import React, { useState } from 'react'
import './ProfileHeader.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPencil } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import ImageUploader from '../ImageUploader/ImageUploader'

function ProfileHeader(props) {
  
  const [profileImageData, setProfileImageData] = useState({})
  const [showImageUploader, setShowImageUploader] = useState(false)

  const updateProfileImage = async () => {
    try {
      axios.put('/api/user/update/profile/image', profileImageData)
      setShowImageUploader(false)
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <div className="ProfileHeader">
      <div className='user-image-header-container'>
        <span onClick={() => setShowImageUploader(true)}>
          <FontAwesomeIcon icon={faPencil} />
        </span>
        <FontAwesomeIcon icon={faUser} className='header-user-icon' />
      </div>
      {showImageUploader ?
        <div className='image-upload-modal'>
          <ImageUploader setProfileImageData={setProfileImageData} type={'profile image'} />
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