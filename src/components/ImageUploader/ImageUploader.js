import React, { useState } from 'react'
import './ImageUploader.scss'
import axios from 'axios'

function ImageUploader() {
  
const [image, setImage] = useState({preview:'', data:'' })

const handleSubmitImage = async (e) => {
  e.preventDefault()
  const formData = new FormData()
  formData.append('file', image.data)
  console.log(...formData)
  console.log('here is the image data =>', formData)
  axios.post('/api/post/image', formData)
}

const handleFileChange = (e) => {
  setImage({
    preview: URL.createObjectURL(e.target.files[0]),
    data: e.target.files[0]
  })
}
  return(
    <div className="ImageUploader">
      <h2>upload a post image</h2>
      <form onSubmit={handleSubmitImage} encType='multipart/form-data'>
        <input type='file' name='file' onChange={handleFileChange}/>
        {image.preview && <img src={image.preview} width='100' height='100' />}
        <button type='submit'>upload</button>
      </form>
    </div>
  )
}

export default ImageUploader 