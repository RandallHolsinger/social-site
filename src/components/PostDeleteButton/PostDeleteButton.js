import React from 'react'
import axios from 'axios'
import { getAllPosts } from '../../../server/controllers/posts'

function PostDeleteButton(props) {

  const deletePost = async () => {
    const {post_id, getPosts} = props
    try {
      await axios.delete(`/api/post/delete/${post_id}`)
      getAllPosts()
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <div className="PostDeleteButton">
      <button onClick={() => {deletePost}}>Delete Post</button>
    </div>
  )
}

export default PostDeleteButton