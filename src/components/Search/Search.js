import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './Search.scss'
import axios from 'axios'

function Search() {
  
  const [searchInput, setSearchInput] = useState('')
  const [items, setItems] = useState([])

  const search = async () => {
    const search = searchInput
    try {
      let res = await axios.get(`/api/search?q=${search}`)
      setItems(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <div className="Search">
      <img src={'./images/user-image-default-white.svg'} alt="profile"/>
      <div>
        <span><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
        <input 
          type="text"
          placeholder='Search'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' ? search() : null}
        />
      </div>
    </div>
  )
}

export default Search