import React, { useState } from 'react'
import axios from 'axios'

function PostEditButton(props) {
 
  const [showEditPost, setShowEditPost] = useState(false)
  const [editPostInput, seEditPostInput] = useState('')
  
  const editPost = async () => {
     const {post_id, getPosts} = props
     try {
      await axios.put(`/api/post/edit/${post_id}`)
      getPosts()
     } catch(err) {
      console.log(err)
     }
  }

  return (
    <div className="PostEditButton">
      <button onClick={() => setShowEditPost(true)}>Edit Post</button>
      {showEditPost ? 
        <div className="post-editor">
          {/* find a way yo get the message into text area to edit the text  */}
          <textarea
            onChange={(e) => setEditPostInput(e.target.value)}
            placeholder='Post Edit'
          />
          <button onClick={() => editPost()}>Save</button>
        </div> 
     }
    </div>
  )
}

export default PostEditButton