import React, { useState } from 'react'
import axios from 'axios'

function PostEditButton(props) {
 
  const [showEditPost, setShowEditPost] = useState(false)
  const [editPostInput, seEditPostInput] = useState('')

  const {post, getPosts} = props
  
  const editPost = async () => {
    const {post_id} = post
    const data = editPostInput
     try {
      await axios.put(`/api/post/edit/${post_id}`, {data})
      getPosts()
      setShowEditPost(false)
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
            onChange={(e) => seEditPostInput(e.target.value)} 
            defaultValue={post.post}
          />
          <button onClick={() => editPost()}>Save</button>
        </div> 
        :
        null
     }
    </div>
  )
}

export default PostEditButton