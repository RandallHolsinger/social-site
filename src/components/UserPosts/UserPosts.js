import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Post from '../Post/Post'

function UserPosts(props) {

  const [userPosts, setUserPosts] = useState([])

  const getUserPosts = async() => {
    try {
      let res = await axios.get('/api/posts/user')
      setUserPosts(res)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUserPosts()
  }, [])

  const mappedUserPosts = userPosts.map((post) => {
    return(
      <Post key={post.post_id} value={post}/>
    )
  })

  return(
    <div className="UserPost">
      <section>
        {mappedUserPosts}
      </section>
    </div>
  )
}

export default UserPosts