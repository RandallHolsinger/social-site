import React, { useState } from 'react'
import './CommentAdd.scss'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons'

interface commentAddProps {
  post_id: number,
  getComments: () => Promise<void>
}


function CommentAdd(props: commentAddProps) {
  
  const { post_id, getComments } = props

  const [commentInput, setCommentInput] = useState<string>('')

  const addComment = async (e: React.FormEvent<HTMLInputElement | HTMLFormElement>) => {
    e.preventDefault()
    const data = commentInput
    try {
      await axios.post(`/api/comment/add/${post_id}`, {data})
      await getComments()
      
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommentInput(e.target.value)}
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