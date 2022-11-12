import React from 'react'
import './MessageInboxItem.scss'

function MessageInboxItem(props) {

  const {value} = props

  return(
    <div className="MessageInboxItem">
      <article>
        <h2>{value.subject}</h2>
        <h4>{value.message}</h4>
      </article>
    </div>
  )
}

export default MessageInboxItem