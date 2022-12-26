import React, { useState } from 'react'
import './PostAddButton.scss'
import ImageUploader from '../ImageUploader/ImageUploader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function PostAddButton(props) {
  
  const [postInput, setPostInput] = useState('')
  const [titleInput, setTitleInput] = useState('')
  const [postData, setPostData] = useState({})
  const [showPostModal, setShowPostModal] = useState(false)

  const {getPosts} = props

  const addPost = async () => {
    console.log('post add button', ...postData)
    try {
      postData.append('titleInput', titleInput)
      postData.append('postInput', postInput)
      await axios.post('/api/post/add', postData)
      await getPosts()
    } catch(err) {
      console.log(err)
    }
    setShowPostModal(false)
    setTitleInput('')
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
          <div className='text-area-container'>
            <label>Add A Title</label>
            <textarea
              type='text'
              spellCheck='true'
              rows='2'
              cols='40'
              placeholder='Title'
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              className='title-area'
            />
            <textarea 
              type='text'
              spellCheck='true'
              rows='5'
              cols='40'
              placeholder="What's on your mind?"
              value={postInput}
              onChange={(e) => setPostInput(e.target.value)}
              className='post-area'
            />
          </div>
          <ImageUploader setPostData={setPostData} type={'post'}/>
          <div className='post-buttons-container'>
            <button onClick={() => addPost()} className='add-post-button'>
              <FontAwesomeIcon icon={faPlus} className='add-post-plus-icon'/>
              Add Post
            </button>
            <button onClick={() => setShowPostModal(false)} className='cancel-post-button'>Cancel</button>
          </div>
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