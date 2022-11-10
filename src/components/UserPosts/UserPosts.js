import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Post from '../Post/Post'
import PostAddButton from '../PostAddButton/PostAddButton'

function UserPosts() {

  const [userPosts, setUserPosts] = useState([])

  const getUserPosts = async() => {
    try {
      let res = await axios.get('/api/posts/user')
      setUserPosts(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUserPosts()
  }, [])

  let mappedUserPosts = userPosts[0] && userPosts.map(post => {
    return(
      <Post key={post.post_id} value={post}/>
    )
  })

  return(
    <div className="UserPost">
      <section>
        User Posts here
        <PostAddButton getPosts={getUserPosts} />
        {mappedUserPosts}
      </section>
    </div>
  )
}

export default UserPosts