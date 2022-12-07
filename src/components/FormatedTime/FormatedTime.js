import React from 'react'

function FormatedTime(props) {
  
  const timestamp = new Date(props.time)
  const newTime = timestamp.toLocaleTimeString()
  
  return(
    <>
     <span>{newTime}</span>
    </>
  )
}

export default FormatedTime