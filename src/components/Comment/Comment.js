import React from 'react'
import './Comment.scss'

function Comment(props) {
  return(
    <div className="Commment">
      <article>
        <p>props.value.comment</p>
      </article>
    </div>
  )
}
export default Comment