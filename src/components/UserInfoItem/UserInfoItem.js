import React from 'react'
import './UserInfoItem.scss'

function UserInfoItem(props) {
  const {htmlFor, label, data} = props
  return(
    <>
     {data ?
       <>
         <li>
          <label htmlFor={htmlFor}>{' '}{label}</label>
          <span>{data}</span>
         </li>
       </>
     :
       null
     } 
    </>
  )
}

export default UserInfoItem