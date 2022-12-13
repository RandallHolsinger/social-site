import React, { useState } from 'react'
import './ImageUploader.scss'
import axios from 'axios'

function ImageUploader() {
  
const [image, setImage] = useState({preview:'', data:'' })
const [status, setStatus] = useState('')

const handleSubmitImage = async (e) => {
  e.preventDefault()
  const formData = new FormData()
  formData.append('file', image.data)
  console.log('here is the image data =>', formData)
  let res = axios.post('/api/post/image', {
    data: formData,
    header: {"Content-Type" : "multipart/form-data"}
  })
  if (res) setStatus(res.statusText)
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
      <form onSubmit={handleSubmitImage} encType='multipart/form'>
        <input type="file" name='file' onChange={handleFileChange}/>
        {image.preview && <img src={image.preview} width='100' height='100' />}
        <button type='submit'>upload</button>
      </form>
      {status && <h5>{status}</h5>}
    </div>
  )
}

export default ImageUploader 