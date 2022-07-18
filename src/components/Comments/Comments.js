import React, { useState, useEffect } from 'react'
import './Comments.scss'
import CreateComment from '../CreateComment/CreateComment'
import Comment from '../Comment/Comment'
import axios from 'axios'

function Commments(props) {

  const [comments, setComments] = useState([])

  const getComments = async () => {
    try {
     let res = await axios.get(`/api/comments/${props.postId}`)
     setComments(res)
    } catch(err) {
      console.log(err)
    }
  }

  let mappedComments = comments.map(comment => {
    return(
      <Comment key={comment.comment.comment_id} value={comment} />
    )
  })

  useEffect(() => {
    getComments()
  }, [])

  return(
    <div className="Comments">
      <section>
         <CreateComment postId={props.postId} getComments={getComments}/>
        {mappedComments}
      </section>
    </div>
  )
}

export default Commments