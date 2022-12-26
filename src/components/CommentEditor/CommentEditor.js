import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import './CommentEditor.scss'
import axios from "axios" 

function CommentEditor(props) {

  const {comment, getComments, setShowOptions, setShowEditComment} = props

  const [editCommentInput, setEditCommentInput] = useState('')

  const editComment = async () => {
    const {comment_id} = comment
    const data = editCommentInput
    try {
      await axios.put(`/api/comment/edit/${comment_id}`, {data})
      setShowEditComment(false)
      setShowOptions(false)
      getComments()
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="CommentEditor">
      <div className='editor-header'>
        <FontAwesomeIcon icon={faPenToSquare} className='editor-header-icon'/>
        <h3>Edit Comment</h3>
      </div>
      <label htmlFor='commenteditor'>Please edit your comment below:</label>
      <textarea
       onChange={(e) => setEditCommentInput(e.target.value)}
       defaultValue={comment.comment} 
       name="comment-editor" 
       cols="30" 
       rows="5"
      />
      <div className="comment-editor-buttons">
        <button onClick={() => editComment()} className='comment-edit-save'>
          <FontAwesomeIcon icon={faFloppyDisk} className='comment-editor-save-icon' />
          Save
        </button>
        <button onClick={() => setShowEditComment(false)} className='comment-edit-cancel'>
          <FontAwesomeIcon icon={faX} className='comment-editor-cancel-icon' />
          Cancel
        </button>
      </div>
    </div>
  )
}

export default CommentEditor