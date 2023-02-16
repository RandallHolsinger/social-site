import React, { useEffect } from 'react'
import './Message.scss'
import FormatedDate from '../FormatedDate/FormatedDate'
import FormatedTime from '../FormatedTime/FormatedTime'

function Message(props) {

  const {value} = props
   
  useEffect(() => {
    console.log('value', value) 
  }, [])

  return(
    <div className="Message">
      <article>
        <header className='message-header'>
          <h2>{value.subject}</h2>
          <h4><FormatedDate date={value.date}/>{' '}<FormatedTime time={value.time}/></h4>
        </header>
        <p>{value.message}</p>
      </article>
    </div>
  )
}

export default Message