import React from 'react'
import './UserInfoItem.scss'

interface UserInfoItemProps {
  htmlFor: string,
  label: string,
  data?: string | undefined,
  icon: JSX.Element
}

export const UserInfoItem: React.FC<UserInfoItemProps> = (props) => {

  const {htmlFor, label, data, icon} = props

  return(
    <>
      <li className='user-info-list-item'>
       <span className='user-information-icons'>{icon}</span>
       <label htmlFor={htmlFor}>
         {label}{' '}:
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