import React, { useState, useEffect } from 'react'
import './Login.css'
import '../css/List.css'
import { Link } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  TextField,
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'

import EditIcon from '@mui/icons-material/Edit'

import { getCustomers, filterCustomer } from '../functions/fetchCustomer'

const AdminCustomer = () => {
  const [customers, setCustomers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const itemsPerPage = 100
  const displayedCustomers = searchQuery ? searchResults : customers
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCustomers = displayedCustomers.slice(
    indexOfFirstItem,
    indexOfLastItem,
  )

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const fetchedCustomers = await getCustomers()
        setCustomers(fetchedCustomers.data)
      } catch (error) {
        console.error('Error fetching customers:', error)
      }
    }

    fetchCustomers()
  }, [])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const renderPagination = () => {
    const maxButtonsToShow = 5
    const buttons = []
    const totalPages = Math.ceil(displayedCustomers.length / itemsPerPage)
    const totalButtonGroups = Math.ceil(totalPages / maxButtonsToShow)
    let currentButtonGroup = Math.ceil(currentPage / maxButtonsToShow)

    if (totalButtonGroups > 1) {
      for (
        let i = (currentButtonGroup - 1) * maxButtonsToShow + 1;
        i <= currentButtonGroup * maxButtonsToShow;
        i++
      ) {
        if (i > totalPages) break
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            disabled={i === currentPage}
          >
            {i}
          </button>,
        )
      }

      if (currentButtonGroup < totalButtonGroups) {
        buttons.push(
          <button
            key="next"
            onClick={() =>
              handlePageChange(currentButtonGroup * maxButtonsToShow + 1)
            }
          >
            Next
          </button>,
        )
      }

      if (currentButtonGroup > 1) {
        buttons.unshift(
          <button
            key="prev"
            onClick={() =>
              handlePageChange((currentButtonGroup - 1) * maxButtonsToShow)
            }
          >
            Prev
          </button>,
        )
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            disabled={i === currentPage}
          >
            {i}
          </button>,
        )
      }
    }

    return <div className="margin-center">{buttons}</div>
  }

  useEffect(() => {
    const updateCustomersWithFilter = async () => {
      console.log(customers)
      if (customers.length > 0) {
        const result = filterCustomer(customers, searchQuery)
        console.log(result)
        setSearchResults(result)
        setCurrentPage(1)
      }
    }
    updateCustomersWithFilter()
  }, [searchQuery])

  const handleShowDetails = () => {
    console.log('customer inspect or something')
  }

  const handleRemoveCustomer = () => {
    console.log('customer removed or something')
  }

  return (
    <div className="container">
      <div>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          margin="normal"
        />
      </div>
      <div className="margin-center">{renderPagination()}</div>
      <List sx={{ width: '100%', bgcolor: 'background.paper', color: 'black' }}>
        {currentCustomers.map((customer) => (
          <ListItem key={customer.id} disableGutters>
            <ListItemText
              primary={`${customer.customerName} - ${customer.email}`}
            />
            <ListItemSecondaryAction>
              <Tooltip title="Inspect customer">
                <IconButton
                  edge="end"
                  aria-label="inspect"
                  onClick={handleShowDetails}
                >
                  <PlayCircleIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <Link to={``}>
                  <IconButton edge="end" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip title="Remove">
                <IconButton
                  edge="end"
                  aria-label="Remove"
                  onClick={handleRemoveCustomer}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default AdminCustomer
