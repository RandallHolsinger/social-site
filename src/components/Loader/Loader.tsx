import React from 'react'
import './Loader.scss'
import { Bars } from 'react-loader-spinner'

export const Loader: React.FC = () => {
  return(
    <div className="Loader">
      <Bars
        height="150"
        width="150"
        color="#fff"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  )
}

export default Loader