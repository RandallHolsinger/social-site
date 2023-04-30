import React from 'react'
import './GlobalMessage.scss'
import { useAppSelector } from '../../redux/reduxHooks'
import { SocketMessageData as IProps } from '../GlobalMessenger/GlobalMessenger'

interface GlobalMessageProps {
  value: IProps
}


export const GlobalMessage: React.FC<GlobalMessageProps> = (props) => {
  
  const { value } = props

  const userId = useAppSelector(state => state.user.userId)
  
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