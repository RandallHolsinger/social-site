import React, { useState } from 'react'
import './ProfileHeader.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCamera } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import ImageUploader from '../ImageUploader/ImageUploader'
import Image from '../Image/Image'
import { IUser as IProps } from '../PersonalProfile/PersonalProfile'
import { useAppSelector } from '../../redux/reduxHooks'

interface ProfileHeaderProps {
  user: IProps,
  getUserInfo: () => Promise<void>
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = (props) => {

  const { user, getUserInfo } = props

  const mainUserId = useAppSelector(state => state.user.userId)
  
  const [profileImageData, setProfileImageData] = useState({})
  const [showImageUploader, setShowImageUploader] = useState(false)

  const updateProfileImage = async () => {
    try {
      await axios.put(`/api/user/update/profile/image`, profileImageData)
      getUserInfo()
      setShowImageUploader(false)
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <div className="ProfileHeader">
      <div className="user-header-info">
        <div className='user-image-header-container'>
          {user.user_id === mainUserId ?
            <span onClick={() => setShowImageUploader(true)} className='header-image-edit-icon'>
              <FontAwesomeIcon icon={faCamera} />
            </span>
          : 
            null
          }
          {user.profile_img ?
            <Image image={user.profile_img} style={'profile-user-image'}/>
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