import React from 'react'
import './OptionsModal.scss'
import OutsideClickHandler from 'react-outside-click-handler'

function OptionsModal(props) {
  
  const {EditButton, DeleteButton, setShowOptions} = props

  return (
    <OutsideClickHandler onOutsideClick={() => setShowOptions(false)}>
      <div className="OptionsModal">
        {EditButton}
        {DeleteButton}
      </div>
    </OutsideClickHandler>
  )
}

export default OptionsModal