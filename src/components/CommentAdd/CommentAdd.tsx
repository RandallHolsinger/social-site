import React, { useState } from 'react'
import './CommentAdd.scss'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons'

interface commentAddProps {
  post_id: number,
  getComments: () => Promise<void>,
  setCommentCount: React.Dispatch<React.SetStateAction<number>>
}


export const CommentAdd: React.FC<commentAddProps> = (props) => {
  
  const { post_id, getComments, setCommentCount } = props

  const [commentInput, setCommentInput] = useState<string>('')

  const addComment =  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = commentInput
    try {
      await axios.post(`/api/comment/add/${post_id}`, {data})
      setCommentCount(state => state + 1)
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
          placeholder='Add A Comment Here'
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