import React from 'react'
import './Post.scss'

function Post(props) {
  return(
    <div className="Post">
      <article>
        <p>{props.value.post}</p>
      </article>
    </div>
  )
}

export default Post