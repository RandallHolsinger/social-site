import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './Search.scss'
import { useEffect } from 'react'

function Search(props) {

  const {items, setItems} = props

  const [searchFilter, setSearchFilter] = useState('')

  let filteredItems = items.filter(item => {
    return (
      item.first_name.toLowerCase().includes(searchFilter) ||
      item.first_name.toUpperCase().includes(searchFilter) ||
      item.last_name.toLowerCase().includes(searchFilter) ||
      item.last_name.toUpperCase().includes(searchFilter)
    )
  })

  useEffect(() => {
    setItems(filteredItems)
  }, [searchFilter])

  return (
    <div className='Search'>
      <span>Search</span>
      <div className='search-input-container'>
        <FontAwesomeIcon icon={faSearch} className='search-icon' />
        <input 
          onChange={(e) => setSearchFilter(e.target.value)}
          type='search'
          className='search-input'
        />
      </div>
    </div>
  )
}

export default Search