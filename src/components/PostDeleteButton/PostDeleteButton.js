import React from 'react'
import './PostDeleteButton.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function PostDeleteButton(props) {
  
  const {post_id, getPosts, setShowOptions} = props

  const deletePost = async () => {
    try {
      await axios.delete(`/api/post/delete/${post_id}`)
      setShowOptions(false)
      getPosts()
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <>
      <button onClick={() => {deletePost()}} className='post-delete-button'>
        <FontAwesomeIcon icon={faTrash} className='post-delete-icon'/>
        Delete
      </button>
    </>
  )
}

export default PostDeleteButton