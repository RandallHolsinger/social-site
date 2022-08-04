import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import './FriendStatus.scss'
import axios from 'axios'
import FriendAddButton from '../FriendAddButton/FriendAddButton'
import FriendAcceptButton from '../FriendAcceptButton/FriendAcceptButton'

function FriendStatus(props) {

  const userId = useSelector(state => state.user.userId)

  // Need to be able to toggle the state of the buttons and save on page refresh
  const friendStatusLogic = () => {}

  useEffect(() => {}, [])

  return(
    <div className="FriendStatus">
      {friendStatusLogic()}
    </div>
  )
}

export default FriendStatus