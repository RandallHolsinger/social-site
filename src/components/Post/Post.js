import React from 'react'
import './Post.scss'
import Comments from '../Comments'

function Post(props) {
  
  return(
    <div className="Post">
      <article>
        <p>{props.value.post}</p>
      </article>
      <Comments />
    </div>
  )
}

export default Post