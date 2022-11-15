import React, { useState, useEffect } from 'react'
import MessengerSideBar from '../MessengerSideBar/MessengerSideBar'
import MessengerInput from '../MessengerInput/MessengerInput'
import MessengerContent from '../MessengerContent/MessengerContent'

function Messenger() {
  return(
    <div className="Messenger">
      <h2>Instant Messenger</h2>
      <MessengerSideBar />
      <div>
        <MessengerContent />
        <MessengerInput />
      </div>
    </div>
  )
}

export default Messenger