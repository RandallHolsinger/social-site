import React from 'react'
import './CommentDelete.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

interface CommentDeleteProps {
  comment_id: number,
  post_id: number,
  setCommentCount: React.Dispatch<React.SetStateAction<number>>
  getComments: () => Promise<void>
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>
}

export const CommentDelete: React.FC<CommentDeleteProps> = (props) => {
  
  const { comment_id, post_id, getComments, setCommentCount, setShowOptions } = props
 
  const deleteComment = async () => {
    try {
      await axios.delete(`/api/comment/delete/${post_id}/${comment_id}`)
      setCommentCount(state => state - 1)
      setShowOptions(false)
      getComments()
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <>
      <button onClick={() => deleteComment()} className='comment-delete-button'>
        <FontAwesomeIcon icon={faTrashCan} className='comment-delete-icon'/>
        Delete
      </button>
    </>
  )
}

export default CommentDelete