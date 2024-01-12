import React, { useState, useEffect } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  TextField,
  Container,
  Collapse,
  Button,
} from '@mui/material'

//Icons
import ExpandIcon from '@mui/icons-material/Expand'

// custom sx styles packed as classes
import {
  MuiPaperContainerColumn,
  MuiList,
  MuiListCollapse,
  MuiListItem,
  MuiButtonForm,
} from '../css/theme'
import './Login.css'
import '../css/List.css'

// custom functions
import { Customfilter, formatDateString } from '../functions/helpers'
import Pagination from '../sub-components/Pagination'
import { checkAdmin } from '../functions/checkAdmin'
import { putCustomerRequest, getCustomers } from '../functions/fetchCustomer'
import { formStringsToIntegers } from '../functions/helpers'

const AdminCustomer = () => {
  const [customers, setCustomers] = useState([])

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  // Collapse/Edit
  const [expandedCustomerId, setExpandedCustomerId] = useState(null)
  const [editedCustomer, setEditedCustomer] = useState({})

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
  const excludedAttributes = ['customerId', 'id', 'createdAt', 'updatedAt']

  // Getting customers
  useEffect(() => {
    //check admin or redirect
    checkAdmin()
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

  const handleShowDetails = (id) => {
    if (expandedCustomerId === id) {
      setExpandedCustomerId(null)
    } else {
      setExpandedCustomerId(id)
    }
  }

  //Editing the shown details
  const handleInputChange = (field, value) => {
    setEditedCustomer({
      ...editedCustomer,
      [field]: value,
    })
  }

  //Sending Edited details
  const handleSubmit = (event, customerId) => {
    event.preventDefault()
    //converting form strings to integers returneds as a json object
    const fixedformdata = formStringsToIntegers(editedCustomer)
    putCustomerRequest(customerId, fixedformdata)
    setEditedCustomer(null)
  }

  return (
    <Container sx={MuiPaperContainerColumn}>
      <div>
        <TextField
          label="Search"
          sx={{ backgroundColor: 'white' }}
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
          <React.Fragment key={customer.id}>
            <ListItem key={customer.id} disableGutters sx={MuiListItem}>
              <ListItemText
                primary={`${customer.customerName} - ${customer.email}`}
              />
              <ListItemSecondaryAction>
                <Tooltip title="Expand customer">
                  <IconButton
                    edge="end"
                    aria-label="expand"
                    onClick={() => handleShowDetails(customer.id)}
                  >
                    <ExpandIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
            <Collapse
              in={expandedCustomerId === customer.id}
              timeout="auto"
              unmountOnExit
            >
              <form onSubmit={(event) => handleSubmit(event, customer.id)}>
                <List sx={MuiListCollapse}>
                  {/* Map through the items attributes to create the text fields */}
                  {Object.keys(customer).map((attribute) => {
                    if (!excludedAttributes.includes(attribute)) {
                      return (
                        <ListItem key={attribute}>
                          <TextField
                            label={
                              attribute.charAt(0).toUpperCase() +
                              attribute.slice(1)
                            }
                            defaultValue={customer[attribute]}
                            onChange={(e) =>
                              handleInputChange(attribute, e.target.value)
                            }
                          />
                        </ListItem>
                      )
                    }
                    return null // this skips rendering empty ListItem div ^^
                  })}
                  <ListItem>
                    <ListItemText
                      primary={`Created At: ${formatDateString(
                        customer.createdAt,
                      )}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={`Updated At: ${formatDateString(
                        customer.updatedAt,
                      )}`}
                    />
                  </ListItem>
                  <Button sx={MuiButtonForm} type="submit">
                    Save Changes
                  </Button>
                </List>
              </form>
            </Collapse>
          </React.Fragment> //such a fuqin mess
        ))}
      </List>
    </Container>
  )
}

export default AdminCustomer
