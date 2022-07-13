import React from 'react'
import './UserInfo.scss'

function UserInfo(props) {
  return(
    <section className={props.style}>
       <header>
        <span>Intro ICON Here</span>
        <h2>Intro</h2>
       </header>
       mapped list here
    </section>
  )
}

export default UserInfo