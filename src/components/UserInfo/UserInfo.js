import React from 'react'
import './UserInfo.scss'

function UserInfo(props) {
  return(
    <div className="UserInfo">
      <section className={props.style}>
         <header>
          <span>Intro ICON Here</span>
          <h2>Intro</h2>
         </header>
         mapped user details here 
      </section>
    </div>
  )
}

export default UserInfo