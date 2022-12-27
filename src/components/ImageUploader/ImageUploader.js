import React, { useState, useEffect } from 'react'
import './ImageUploader.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faUpload, faX, faCheck } from '@fortawesome/free-solid-svg-icons'

function ImageUploader(props) {
 
const {setPostData, setProfileImageData, setUpdatedPostData, type} = props

useEffect(() => {
  console.log('type ==>', type)
}, [])
  
const [image, setImage] = useState({preview:'', data:'' })

const updateImage = async (e) => {
  const formData = new FormData()
  formData.append('file', image.data)
  switch(type) {
    case 'post':
      setPostData(formData)
      break;
    case 'profile_image':
      setProfileImageData(formData)
      break;
    case 'update_post':
      console.log('hit')
      setUpdatedPostData(formData)
      break;
    default:
      console.log('No type was found')
  }
}

const handleFileChange = (e) => {
  setImage({
    preview: URL.createObjectURL(e.target.files[0]),
    data: e.target.files[0]
  })
}

useEffect(() => {
  updateImage()
}, [image])

const cancelImage = () => {
  setImage({
    preview: '',
    data: ''
  })
}
  return(
    <div className="ImageUploader">
        <div className='image-uploader-header'>
          <FontAwesomeIcon icon={faUpload} className='choose-image-icon'/>
          <h3>Choose An Image</h3>
          {image.preview ? <FontAwesomeIcon icon={faCheck} className='upload-check-icon' /> : null}
        </div>
        {image.preview ? 
          <div className='image-preview-container'>
            <FontAwesomeIcon icon={faX} onClick={() => cancelImage()} className='cancel-image' />
            <img src={image.preview}></img>
          </div>
        : 
          <form encType='multipart/form-data'>
            <label className='custom-file-upload'>
              <div>
                <FontAwesomeIcon icon={faImage} className='upload-file-icon'/>
                <input type='file' name='file' onChange={handleFileChange} />
              </div>
            </label>
          </form>
        }
    </div>
  )
}

export default ImageUploader 