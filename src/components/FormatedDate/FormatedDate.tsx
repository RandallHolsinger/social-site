import React from 'react'
import './FormatedDate.scss'

interface DateProps {
  date: string
}

export const FormatedDate: React.FC<DateProps>  = (props) => {
  
  const {date} = props

  const timestamp =  new Date(date)
  const newDate: string = timestamp.toLocaleDateString()
  
  return(
    <>
     <span>{newDate}</span>
    </>
  )
}

export default FormatedDate