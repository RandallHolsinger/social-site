import React, { useState } from 'react'
import './CommentEditButton.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'
import CommentEditor from '../CommentEditor/CommentEditor'

function CommentEditButton(props) {

  const [showEditComment, setShowEditComment] = useState(false)

  const {comment, getComments, setShowOptions} = props

  return(
    <div className='CommentEditButton'>
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

export default CommentEditButton