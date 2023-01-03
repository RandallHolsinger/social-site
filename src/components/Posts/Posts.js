import React, { useState, useEffect } from "react";
import axios from "axios";
import './Posts.scss'
import Post from '../Post/Post'
import PostAdd from "../PostAdd/PostAdd";


function Posts(props) {

  const {user_id} = props

  const [posts, setPosts] = useState([])
  
  const getAllPosts = async () => {
    
    try {
      if(props.user_id) {
        let res = await axios.get(`/api/posts/${user_id}`)
        setPosts(res.data)
      } else {
        let res = await axios.get('/api/posts')
        setPosts(res.data)
      }
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllPosts()
  }, [])

  let mappedPosts = posts.map(post => {
    return(
      <Post key={post.post_id} value={post} getPosts={getAllPosts}/>
    )
  })

  return(
    <div className="Posts">
      <PostAdd getPosts={getAllPosts}/>
      {mappedPosts}
    </div>
  )
}

export default Posts