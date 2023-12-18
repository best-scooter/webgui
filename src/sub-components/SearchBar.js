import React, { useState } from 'react'
import { TextField } from '@mui/material'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />
    </div>
  )
}

export default SearchBar
