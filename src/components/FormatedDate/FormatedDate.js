import React, { useEffect } from 'react'
import './FormatedDate.scss'

function FormatedDate(props) {
  
  const {date} = props

  const timestamp =  new Date(date)
  const newDate = timestamp.toLocaleDateString()

  useEffect(() => {
    console.log('date from props =>', date)
  })
  
  return(
    <>
     <span>{newDate}</span>
    </>
  )
}

export default FormatedDate