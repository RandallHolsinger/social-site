import React from 'react'
import './FormatedDate.scss'

function FormatedDate(props) {
  
  const timestamp =  new Date(props.date)
  const newDate = timestamp.toLocaleDateString()

  return(
    <>
     <span>{newDate}</span>
    </>
  )
}

export default FormatedDate