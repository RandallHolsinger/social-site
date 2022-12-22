import React, { useState } from 'react'
import './ImageUploader.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faUpload, faX } from '@fortawesome/free-solid-svg-icons'
import Oval from 'react-loader-spinner';

function ImageUploader(props) {
 
const {setImageData} = props
  
const [image, setImage] = useState({preview:'', data:'' })
const [showPreview, setShowPreview] = useState(false)

const submitImage = async (e) => {
  const formData = new FormData()
  formData.append('file', image.data)
  console.log(...formData)
  console.log('here is the image data =>', formData)
  setImageData(formData)
}

const handleFileChange = (e) => {
  setImage({
    preview: URL.createObjectURL(e.target.files[0]),
    data: e.target.files[0]
  })
  submitImage()
}

const cancelImage = () => {
  setImage({
    preview: '',
    data: ''
  })
}
  return(
    <div className="ImageUploader">
        <header>
          <FontAwesomeIcon icon={faUpload} className='choose-image-icon'/>
          <h3>Choose An Image</h3>
        </header>
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