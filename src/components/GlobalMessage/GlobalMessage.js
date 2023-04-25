import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './GlobalMessage.scss'

function GlobalMessage(props) {
  
  const {value} = props

  const userId = useSelector(state => state.user.userId)
  
  useEffect(() => {
    console.log('mapped value here =>', value)
    console.log(userId)
  }, [])

  return (
    <div className="GlobalMessage">
      <p>
        <span className={(userId === value.userId ? 'messenger-name-sender' : 'messenger-name-receiver')}>
          {value.firstName}{' '}{value.lastName}
        </span>
        {value.globalInput}
      </p>
    </div>
  )
}

export default GlobalMessage