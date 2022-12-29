import React, { useState } from 'react'
import './UserEditor.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Input from '../Input/Input'
import axios from 'axios'

function UserEditor(props) {
  return (
    <div className="UserEditor">
      <header className='user-editor-header'>
        <FontAwesomeIcon icon={faPenToSquare} className='user-edit-icon' />
        <h3>Update Your Info</h3>
      </header>
      <label htmlFor=""></label>
      <label htmlFor=""></label>
      <label htmlFor=""></label>
    </div>
  )
}

export default UserEditor