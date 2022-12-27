import React, { useState } from 'react'
import './PostEditButton.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'
import PostEditor from '../PostEditor/PostEditor'

function PostEditButton(props) {
 
  const [showEditPost, setShowEditPost] = useState(false)

  const {post, getPosts, setShowOptions} = props
  

  return (
    <div className="PostEditButton">
      <button onClick={() => setShowEditPost(true)} className='post-edit-button'>
        <FontAwesomeIcon icon={faPenSquare} className='post-edit-icon' />
        Edit
      </button>
      {showEditPost ?
        <PostEditor 
          post={post}
          getPosts={getPosts}
          setShowEditPost={setShowEditPost}
          setShowOptions={setShowOptions}
        />
      :
        null
      }
    </div>
  )
}

export default PostEditButton