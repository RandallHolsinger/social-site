import axios from 'axios'
import React, { useState } from 'react'

function CreateComment(props) {

  const [commentInput, setCommentInput] = useState('')

  const addComment = async () => {
    const {postId} = props
    const data = commentInput
    try {
      await axios.post(`/api/comment/${postId}`, {data})
      await props.getComments()
       
    } catch(err) {
      console.log(err)
    }
    setCommentInput('')
  }

  return(
    <div className="CreateComment">
      <section>
        <input 
          type="text"
          placeholder='Add a comment here'
          onChange={(e) => setCommentInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' ? addComment() : null}
        />
      </section>
    </div>
  )
}

export default CreateComment