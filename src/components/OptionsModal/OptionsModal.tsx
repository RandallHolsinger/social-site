import React, { useState, useEffect } from 'react'
import './OptionsModal.scss'
import OutsideClickHandler from 'react-outside-click-handler'

interface OptionsModalProps {
  EditButton: React.ReactNode,
  DeleteButton: React.ReactNode,
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>
  commentStyle?: string,
  postStyle?: string
}

export const OptionsModal: React.FC<OptionsModalProps> = (props) => {
  
  const {EditButton, DeleteButton, setShowOptions, commentStyle, postStyle} = props

  const [style, setStyle] = useState('')

  const renderStyle = () => {
    if(commentStyle) {
      setStyle(commentStyle)
    } else if(postStyle) {
      setStyle(postStyle)
    }
  }

  useEffect(() => {
    renderStyle()
  }, [])

  return (
    <OutsideClickHandler onOutsideClick={() => setShowOptions(false)}>
      <div className={`OptionsModal ${style}`}>
        {EditButton}
        {DeleteButton}
      </div>
    </OutsideClickHandler>
  )
}

export default OptionsModal