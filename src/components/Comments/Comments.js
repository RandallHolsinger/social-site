import React, { useState, useEffect } from 'react'
import './Comments.scss'
import Comment from '../Comment/Comment'
import axios from 'axios'

function Commments(props) {

  const [comments, setComments] = useState([])

  const getComments = async () => {
    try {
     let res = await axios.get(`/api/comments/${post_id}`)
     setComments(res)
    }
  }

  let mappedComments = comments.map(comment => {
    return(
      <Comment key={comment.comment.comment_id} value={comment} />
    )
  })

  return(
    <div className="Comments">
      <section>
        {mappedComments}
      </section>
    </div>
  )
}

export default Commments