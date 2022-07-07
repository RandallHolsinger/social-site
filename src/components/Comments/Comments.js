import React, { useState, useEffect } from 'react'
import './Comments.scss'
import Comment from '../Comment/Comment'

function Commments(props) {

  const [comments, setComments] = useState([])

  return(
    <div className="Comments">
      Comments
    </div>
  )
}

export default Commments