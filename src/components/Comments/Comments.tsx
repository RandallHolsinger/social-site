import React, { useState, useEffect } from 'react'
import './Comments.scss'
import CommentsAddButton from '../CommentAdd/CommentAdd'
import Comment from '../Comment/Comment'
import axios from 'axios'

export interface commentsProps {
  post_id: number,
  setCommentCount: React.Dispatch<React.SetStateAction<number>>
}

export interface IComment {
  user_id: number,
  first_name: string,
  last_name: string,
  profile_img?: string,
  comment_id: number,
  comment: string,
  edited?: boolean,
  date: string,
}

export const Comments: React.FC<commentsProps> = (props) => {

  const [comments, setComments] = useState<IComment[]>([])

  const {post_id, setCommentCount} = props

  const getComments = async () => {
    try {
     let res = await axios.get(`/api/comments/${post_id}`)
     setComments(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  let mappedComments = comments.map(comment => {
    return(
      <Comment 
        key={comment.comment_id} 
        value={comment} 
        post_id={props.post_id} 
        getComments={getComments}
        setCommentCount={setCommentCount}
      />
    )
  })

  useEffect(() => {
    getComments()
  }, [])

  return(
    <div className="Comments">
      <CommentsAddButton post_id={props.post_id}  getComments={getComments} setCommentCount={setCommentCount}/>
      <div className='comments-container' role='list'>
        {mappedComments}
      </div>
    </div>
  )
}

export default Comments