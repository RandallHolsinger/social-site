import React, { useState } from 'react'
import './PostAdd.scss'
import ImageUploader from '../ImageUploader/ImageUploader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faIdCard} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useAppSelector } from '../../redux/reduxHooks'

function PostAdd(props) {
  
  const [postInput, setPostInput] = useState('')
  const [titleInput, setTitleInput] = useState('')
  const [postData, setPostData] = useState({})
  const [showPostModal, setShowPostModal] = useState(false)

  const main_user_id = useAppSelector(state => state.user.userId)

  const {getPosts, pagePosition, user_id} = props

  const addPost = async () => {
    try {
      postData.append('titleInput', titleInput)
      postData.append('postInput', postInput)
      await axios.post('/api/post/add', postData)
      getPosts()
    } catch(err) {
      console.log(err)
    }
    setShowPostModal(false)
    setTitleInput('')
    setPostInput('')
  }
  

  return(
    <div className={`PostAdd ${pagePosition}`}>
      {showPostModal ?
        <div className="add-post-container">
          <header>
            <FontAwesomeIcon icon={faIdCard} className='create-post-icon'/>
            <h2>Create a Post</h2>
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
            <label>Content</label>
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
            <span onClick={() => setShowPostModal(false)} className='cancel-post-button'>Cancel</span>
            <button onClick={() => addPost()} className='add-post-button'>
              <FontAwesomeIcon icon={faPlus} className='add-post-plus-icon'/>
              Add Post
            </button>
          </div>
        </div>
      :
        <div className='posts-toolbar'>
          <h3>
            <FontAwesomeIcon icon={faIdCard} className='posts-icon'/>
            Posts
          </h3>
          {user_id === main_user_id || user_id == null ?
          <button onClick={() => setShowPostModal(true)} className='post-add'>
            <FontAwesomeIcon icon={faPlus} className='add-post-icon'/>
            Create A Post
          </button>
          :
          null
          }
        </div>
      }
    </div>
  )
}

export default PostAdd