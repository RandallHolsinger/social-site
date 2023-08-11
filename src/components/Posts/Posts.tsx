import React, { useState, useEffect } from "react";
import axios from "axios";
import './Posts.scss'
import Post from '../Post/Post'
import PostAdd from "../PostAdd/PostAdd";
import NoContentMessage from "../NoContentMessage/NoContentMessage";
import Loader from "../Loader/Loader";

interface PostProps {
  user_id?: number | undefined,
  pagePosition?: string;

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

  const { user_id, pagePosition } = props

  const [posts, setPosts] = useState<IPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const getAllPosts = async () => {
  try {
      if(user_id) {
        let res = await axios.get(`/api/posts/${user_id}`)
        setPosts(res.data)
        setIsLoading(false)
      } else {
        let res = await axios.get('/api/posts')
        setPosts(res.data)
        setIsLoading(false)
      }
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllPosts()
    setIsLoading(true)
  }, [])

  let mappedPosts = posts.map(post => {
    return(
      <Post key={post.post_id} value={post} getPosts={getAllPosts}/>
    )
  })

  const renderPost = () => {
    if(isLoading) {
      return (
        <Loader />
      )
    } else {
      if(posts[0]) {
        return (
          <div className="posts">
            {mappedPosts}
          </div>
        ) 
      } else {
        return (
          <NoContentMessage subject={'There are no posts to show'} />
        )
      }
    }
  }

  return(
    <div className={`Posts`}>
      <PostAdd getPosts={getAllPosts} pagePosition={pagePosition} />
      {renderPost()}
    </div>
  )
}

export default Posts