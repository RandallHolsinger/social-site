import React from 'react'
import './Input.scss'

function Input(props) {
  
  const {onChange, value, id, name, type, placeholder, style} = props

  return(
    <>
      <input 
        onChange={onChange}
        value={value}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={style}
      />
    </>
  )
}

export default Input