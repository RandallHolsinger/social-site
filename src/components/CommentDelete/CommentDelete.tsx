import React from 'react'
import './CommentDelete.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

interface CommentDeleteProps {
  comment_id: Number,
  getComments: () => Promise<void>
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>
}

export const CommentDelete: React.FC<CommentDeleteProps> = (props) => {
  
  const { comment_id, getComments, setShowOptions } = props
 
  const deleteComment = async () => {
    setShowOptions(false)
    try {
      await axios.delete(`/api/comment/delete/${comment_id}`)
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