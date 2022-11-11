import React, { useState } from 'react'
import axios from 'axios'

function CommentEditButton(props) {

  const [editCommentInput, setEditCommentInput] = useState('')
  const [showEditComment, setShowEditComment] = useState(false)

  const {comment, getComments} = props

  console.log('here uis comment object =>', comment)

  const editComment = async () => {
    const {comment_id} = comment
    const data = editCommentInput
    try {
      await axios.put(`/api/comment/edit/${comment_id}`, {data})
      getComments()
      setShowEditComment(false)
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <div className="CommentEditButton">
      <button onClick={() => setShowEditComment(true)}>Edit</button>
      {showEditComment ?
        <div className="comment-editor">
          <textarea
            onChange={(e) => setEditCommentInput(e.target.value)}
            defaultValue={comment.comment} 
            name="comment-editor" 
            cols="30" 
            rows="10"
           />
           <button onClick={() => editComment()}>Save</button>
        </div>
      :
        null
      }
    </div>
  )
}

export default CommentEditButton