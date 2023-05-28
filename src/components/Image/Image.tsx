import React, {useState, useEffect} from 'react'
import './Image.scss'
import axios from 'axios'

interface ImageProps {
  image: string,
  style: string
}

export const Image: React.FC<ImageProps> = (props) => {

  const { image, style } = props

  const [imageSrc, setImageSrc] = useState<string>('')
  
  const getProfileImage = async () => {
    try {
      let res = await axios.get(`/api/user/image/${image}`)
      const imageUrl = URL.createObjectURL(res.data)
      setImageSrc(imageUrl)
    } catch(err) {
      console.log(err)
    }
  }


  useEffect(() => {
    getProfileImage()
  }, [image])

  return(
    <>
      <img src={imageSrc} className={style} alt='profile' />
    </>
  )
}

export default Image