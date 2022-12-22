import React, { useState } from 'react'
import './PostAddButton.scss'
import ImageUploader from '../ImageUploader/ImageUploader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function PostAddButton(props) {
  
  const [postInput, setPostInput] = useState('')
  const [titleInput, setTitleInput] = useState('')
  const [imageData, setImageData] = useState({})
  const [showPostModal, setShowPostModal] = useState(false)

  const {getPosts} = props

  const addPost = async () => {
    console.log(imageData)
    console.log(...imageData)
    try {
      await axios.post('/api/post/add', {titleInput, postInput, imageData})
      await getPosts()
      console.log('add post function end')
    } catch(err) {
      console.log(err)
    }
    setPostInput('')
  }
  return(
    <div className="PostAddButton">
      {showPostModal ?
        <div className="add-post-container">
          <header>
            <FontAwesomeIcon icon={faPenToSquare} className='create-post-icon'/>
            <h3>Create a Post</h3>
          </header>
          <textarea
            type='text'
            spellCheck='true'
            rows='2'
            cols='40'
            placeholder='Title'
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <textarea 
            type='text'
            spellCheck='true'
            rows='5'
            cols='40'
            placeholder="What's on your mind?"
            value={postInput}
            onChange={(e) => setPostInput(e.target.value)}
          />
          <ImageUploader setImageData={setImageData}/>
          <button onClick={() => addPost()}>Add Post</button>
        </div>
      :
        <div className="post-add" onClick={() => setShowPostModal(true)}>
          <FontAwesomeIcon icon={faPenToSquare} className='add-post-icon'/>
          <h3>Create A Post</h3>
        </div>
      }
    </div>
  )
}

export default PostAddButton