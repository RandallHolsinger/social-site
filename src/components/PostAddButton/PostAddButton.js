import React, { useState } from 'react'
import './PostAddButton.scss'
import ImageUploader from '../ImageUploader/ImageUploader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function PostAddButton(props) {
  
  const [postInput, setPostInput] = useState('')
  const [showPostModal, setShowPostModal] = useState(false)

  const {getPosts} = props

  const addPost = async () => {
    try {
      let data = postInput
      console.log('here is post data ==>', data)
      await axios.post('/api/post/add', {data})
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
            <h4>Create a Post</h4>
          </header>
          <input 
            type="text" 
            placeholder="What's on your mind?"
            value={postInput}
            onChange={(e) => setPostInput(e.target.value)}
          />
          <button onClick={() => addPost()}>Add Post</button>
          <ImageUploader />
        </div>
      :
        <div className="post-add" onClick={() => setShowPostModal(true)}>
          <span>+</span>
          <h3>Create A Post</h3>
        </div>
      }
    </div>
  )
}

export default PostAddButton