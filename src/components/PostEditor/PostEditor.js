import React, { useState } from 'react'
import './PostEditor.scss'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import ImageUploader from '../ImageUploader/ImageUploader'

function PostEditor(props) {

  const {post, getPosts, setShowEditPost, setShowOptions} = props
  
  const [editPostTitleInput, setEditPostTitleInput] = useState('')
  const [editPostInput, setEditPostInput] = useState('')
  const [updatedPostData, setUpdatedPostData] = useState({})

  const editPost = async () => {
     const {post_id} = post
    //  console.log('updated post data =>', ...updatedPostData)
     try {
      updatedPostData.append('editPostTitleInput', editPostTitleInput)
      updatedPostData.append('editPostInput', editPostInput)
      await axios.put(`/api/post/edit/${post_id}`, updatedPostData)
      setShowEditPost(false)
      setShowOptions(false)  
      getPosts()
     } catch(err) {
      console.log(err)
     }
  }

  return (
    <div className="PostEditor">
      <div className="post-editor-header">
        <FontAwesomeIcon icon={faPenToSquare} className='post-editor-header-icon' />
        <h3>Edit Post</h3>
      </div>
      <label htmlFor="post-title-editor">
        Edit your title:
      </label>
      <textarea 
        onChange={(e) => setEditPostTitleInput(e.target.value)}
        onDoubleClick={(e) => e.target.select}
        defaultValue={post.post}
        name="post-title-editor" 
        autoFocus='true'
        spellCheck='true'
        cols='50'
        rows='2'
      />
      <label htmlFor="post-content-editor">
        Edit your content:
      </label>
      <textarea 
        onChange={(e) => setEditPostInput(e.target.value)} 
        onDoubleClick={(e) => e.target.select()}
        defaultValue={post.post}
        name="post-content-editor" 
        spellCheck='true'
        cols='50'
        rows='6'
      />
      <ImageUploader setUpdatedPostData={setUpdatedPostData} type={'update_post'} />
      <div className="post-edit-buttons">
        <button onClick={() => editPost()} className='post-edit-save-button'>
          <FontAwesomeIcon icon={faFloppyDisk} className='post-edit-save-icon' />
          Save
        </button>
        <button onClick={() => setShowEditPost(false)} className='post-edit-cancel-button'>
          <FontAwesomeIcon icon={faX} className='post-edit-cancel-icon' />
          Cancel
        </button>
      </div>
    </div>
  )
}

export default PostEditor