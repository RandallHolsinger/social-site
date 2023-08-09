import React, { useState, useEffect } from "react";
import axios from "axios";
import './Posts.scss'
import Post from '../Post/Post'
import PostAdd from "../PostAdd/PostAdd";
import NoContentMessage from "../NoContentMessage/NoContentMessage";

interface PostProps {
  user_id?: number | undefined,
  style?: string
}

export interface IPost {
  user_id: number,
  first_name: string,
  last_name: string,
  profile_img?: string,
  post_id: number,
  title: string,
  post: string,
  image_file: string,
  likes: number,
  liked: boolean,
  comment_count: number,
  date: string
}


export const Posts: React.FC<PostProps> = (props) => {

  const { user_id, style } = props

  const [posts, setPosts] = useState<IPost[]>([])
  
  const getAllPosts = async () => {
  try {
      if(user_id) {
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
    <div className={`Posts`}>
      <PostAdd getPosts={getAllPosts} style={style}/>
      {posts[0] ?
        <div className="posts">
          {mappedPosts}
        </div>
      :
        <NoContentMessage subject={'There are no posts to show'} />
      }
    </div>
  )
}

export default Posts