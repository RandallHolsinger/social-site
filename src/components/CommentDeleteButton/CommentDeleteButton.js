import React from 'react'
import axios from 'axios'

function CommentDeleteButton(props) {

  const deleteComment = async () => {
    const {comment_id, getComments} = props
    try {
      await axios.delete(`/api/comment/delete/${comment_id}`)
      getComments()
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <div className="CommentDeleteButton">
      <button onClick={() => deleteComment()}>Delete</button>
    </div>
  )
}

export default CommentDeleteButton