import React, { useState, useEffect } from "react";
import axios from "axios";
import './Posts.scss'
import Post from '../Post/Post'
import PostAddButton from "../PostAddButton/PostAddButton";


function Posts() {

  const [posts, setPosts] = useState([])
  
  const getAllPosts = async () => {
    try {
      let res = await axios.get('/api/posts')
      setPosts(res.data)
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
      <section>
        <PostAddButton getPosts={getAllPosts}/>
        {mappedPosts}
      </section>
    </div>
  )
}

export default Posts