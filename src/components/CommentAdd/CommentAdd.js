import axios from 'axios'
import './CommentAdd.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'


function CommentAdd(props) {

  const [commentInput, setCommentInput] = useState('')

  const addComment = async (e) => {
    e.preventDefault()
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
    <div className="CommentAdd">
      <form onSubmit={addComment}>
        <input 
          type="text"
          placeholder='Add a comment here'
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          autoFocus={true}
        />
        <button type='submit'>
          <FontAwesomeIcon icon={faPaperPlane} className='comment-send-icon' />
          Comment
        </button>
      </form>
    </div>
  )
}

export default CommentAdd