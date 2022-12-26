import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function PostDeleteButton(props) {

  const deletePost = async () => {
    const {post_id, getPosts} = props
    try {
      await axios.delete(`/api/post/delete/${post_id}`)
      getPosts()
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <div className="PostDeleteButton">
      <button onClick={() => {deletePost()}}>
        <FontAwesomeIcon icon={faTrash} />
        Delete Post
      </button>
    </div>
  )
}

export default PostDeleteButton