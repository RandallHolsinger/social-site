import React from 'react'
import './FormatedDate.scss'

function FormatedDate(props) {
  
  const {date} = props

  const timestamp =  new Date(date)
  const newDate = timestamp.toLocaleDateString()
  
  return(
    <>
     <span>{newDate}</span>
    </>
  )
}

export default FormatedDate