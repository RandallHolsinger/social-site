import { useState, useEffect } from "react";
import './Posts.scss'
import Post from '../Post/Post'


function Post() {

  const [posts, setPosts] = useState([])

  return(
    <div className="Posts">
      Posts
    </div>
  )
}

export default Posts