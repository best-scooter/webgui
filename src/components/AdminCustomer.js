import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  TextField,
  Container,
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import EditIcon from '@mui/icons-material/Edit'

import { MuiPaperContainerColumn, MuiList, MuiListItem } from '../css/theme'
import './Login.css'
import '../css/List.css'

import { getCustomers } from '../functions/fetchCustomer'
import { Customfilter } from '../functions/helpers'
import Pagination from '../sub-components/Pagination'

const AdminCustomer = () => {
  const [customers, setCustomers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  //Setting the data for pagination
  const itemsPerPage = 100
  const buttons = 5
  const displayedCustomers = searchQuery ? searchResults : customers
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCustomers = displayedCustomers.slice(
    indexOfFirstItem,
    indexOfLastItem,
  )
  const totalPages = Math.ceil(displayedCustomers.length / itemsPerPage)

  // Getting customers
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

  //rendering the Pagination component strucutre of the project kinda fucked but it's under sub-components
  const renderPagination = () => {
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        maxButtonsToShow={buttons}
      />
    )
  }

  // this listens for changes to the search query then updates the results according to the result of the filter
  // filter is currently listening on things like sign up date and stuff so it's gotta be patched or possibly has to be patched if it's important
  useEffect(() => {
    const updateCustomersWithFilter = async () => {
      console.log(customers)
      if (customers.length > 0) {
        const result = Customfilter(customers, searchQuery)
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
    <Container sx={MuiPaperContainerColumn}>
      <div>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          margin="normal"
          autoComplete="off"
          placeholder=""
          inputProps={{
            autoComplete: 'off',
          }}
        />
      </div>
      <div className="margin-center">{renderPagination()}</div>
      <List sx={MuiList}>
        {currentCustomers.map((customer) => (
          <ListItem key={customer.id} disableGutters sx={MuiListItem}>
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
    </Container>
  )
}

export default AdminCustomer
