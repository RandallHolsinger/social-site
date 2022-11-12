import React from 'react'
import './Message.scss'
import FormatedDate from '../FormatedDate/FormatedDate'
import FormatedTime from '../FormatedTime/FormatedTime'

function Message(props) {

  const {value} = props

  return(
    <div className="Message">
      <article>
        <header>
          <h2>{value.subject}</h2>
          <h4><FormatedDate />{' '}<FormatedTime /></h4>
        </header>
        <p>{value.message}</p>
      </article>
    </div>
  )
}

export default Message