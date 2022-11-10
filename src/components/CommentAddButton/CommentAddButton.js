import axios from 'axios'
import React, { useState } from 'react'

function CommentAddButton(props) {

  const [commentInput, setCommentInput] = useState('')

  const addComment = async () => {
    const {post_id} = props
    const data = commentInput
    try {
      await axios.post(`/api/comment/add/${post_id}`, {data})
      await props.getComments()
      
    } catch(err) {
      console.log(err)
    }
    setCommentInput('')
  }

  return(
    <div className="CommentAddButton">
      <section>
        <input 
          type="text"
          placeholder='Add a comment here'
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' ? addComment() : null}
        />
        <button onClick={() => addComment()}>Add Comment</button>
      </section>
    </div>
  )
}

export default CommentAddButton