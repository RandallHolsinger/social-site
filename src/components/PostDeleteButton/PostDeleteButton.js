import React from 'react'
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
      <button onClick={() => {deletePost()}}>Delete Post</button>
    </div>
  )
}

export default PostDeleteButton