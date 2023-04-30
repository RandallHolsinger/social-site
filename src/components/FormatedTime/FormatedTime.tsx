import React from 'react'

interface TimeProps {
  time: string
}

export const FormatedTime: React.FC<TimeProps> = (props) => {
  
  const { time } = props

  const timestamp = new Date(time)
  const newTime = timestamp.toLocaleTimeString()
  
  return(
    <>
     <span>{newTime}</span>
    </>
  )
}

export default FormatedTime