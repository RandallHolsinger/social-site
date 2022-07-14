import React from 'react'
import './Post.scss'

function Post(props) {
  
  console.log('here is the props', props)
  return(
    <div className="Post">
      <article>
        <p>{props.value.post}</p>
      </article>
    </div>
  )
}

export default Post