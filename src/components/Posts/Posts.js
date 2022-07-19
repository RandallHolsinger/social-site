import React, { useState, useEffect } from "react";
import axios from "axios";
import './Posts.scss'
import Post from '../Post/Post'
import CreatePost from '../CreatePost/CreatePost'


function Posts() {

  const [posts, setPosts] = useState([])
  
  const getAllPosts = async () => {
    try {
      let res = await axios.get('/api/posts')
      console.log('all posts ==>', res)
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
      <Post key={post.post_id} value={post} />
    )
  })

  return(
    <div className="Posts">
      <section>
        <CreatePost getPosts={getAllPosts}/>
        {mappedPosts}
      </section>
    </div>
  )
}

export default Posts