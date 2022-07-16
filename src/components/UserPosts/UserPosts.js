import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Post from '../Post/Post'
import CreatePost from '../CreatePost/CreatePost'

function UserPosts(props) {

  const [userPosts, setUserPosts] = useState([])

  const getUserPosts = async() => {
    try {
      let res = await axios.get('/api/posts/user')
      setUserPosts(res.data)
      console.log('response ==>', res)
      console.log('user posts object ==>', res)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUserPosts()
  }, [])

  let mappedUserPosts = userPosts[0] && userPosts.map(post => {
    console.log('post==>', post)
    return(
      <Post key={post.post_id} value={post}/>
    )
  })

  return(
    <div className="UserPost">
      <section>
        User Posts here
        <CreatePost getUserPosts={getUserPosts} />
        {mappedUserPosts}
      </section>
    </div>
  )
}

export default UserPosts