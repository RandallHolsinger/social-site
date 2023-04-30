import React, { useState } from 'react'
import './CommentEdit.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'
import CommentEditor from '../CommentEditor/CommentEditor'
import { IComment as IProps } from '../Comments/Comments'

interface CommentEditProps {
  comment: IProps,
  getComments: () => Promise<void>,
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>
}

export const CommentEdit: React.FC<CommentEditProps> = (props) => {

  const [showEditComment, setShowEditComment] = useState(false)

  const { comment, getComments, setShowOptions } = props

  return(
    <div className='CommentEdit'>
      <button onClick={() => setShowEditComment(true)} className='comment-edit-button'>
        <FontAwesomeIcon icon={faPenSquare} className='comment-edit-icon'/>
        Edit
      </button>
      {showEditComment ?
        <CommentEditor 
          comment={comment} 
          getComments={getComments}
          setShowOptions={setShowOptions}
          setShowEditComment={setShowEditComment}
        />
      :
        null
      }
    </div>
  )
}

export default CommentEdit