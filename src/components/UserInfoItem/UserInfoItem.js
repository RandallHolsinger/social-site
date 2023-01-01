import React from 'react'
import './UserInfoItem.scss'

function UserInfoItem(props) {

  const {htmlFor, label, data, icon} = props

  return(
    <>
      <li className='user-info-list-item'>
       <label htmlFor={htmlFor}>
         {icon}
         <p>{label}</p>
       </label>
       {data ? 
         <span className='user-info-item-data'>{data}</span>
       :
         <span className='user-info-item-data'>Empty</span>
       }
      </li>
    </>
  )
}

export default UserInfoItem