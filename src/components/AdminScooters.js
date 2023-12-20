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
  Collapse,
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import EditIcon from '@mui/icons-material/Edit'

import {
  MuiPaperContainerColumn,
  MuiList,
  MuiListItem,
  MuiListCollapse,
} from '../css/theme'
import './Login.css'
import '../css/List.css'

import { getScooters } from '../functions/fetchScooters'
import { Customfilter, formatDateString } from '../functions/helpers'
import Pagination from '../sub-components/Pagination'

const AdminScooter = () => {
  const [Scooters, setScooters] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  // for collapse
  const [expandedScooterId, setExpandedScooterId] = useState(null)

  //Setting the data for pagination
  const itemsPerPage = 100
  const buttons = 5
  const displayedScooters = searchQuery ? searchResults : Scooters
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentScooters = displayedScooters.slice(
    indexOfFirstItem,
    indexOfLastItem,
  )
  const totalPages = Math.ceil(displayedScooters.length / itemsPerPage)

  // Getting customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const fetchedCustomers = await getScooters()
        setScooters(fetchedCustomers.data)
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
    const updateScootersWithFilter = async () => {
      console.log(displayedScooters)
      if (Scooters.length > 0) {
        const result = Customfilter(Scooters, searchQuery)
        console.log(result)
        setSearchResults(result)
        setCurrentPage(1)
      }
    }
    updateScootersWithFilter()
  }, [searchQuery])

  const handleShowDetails = (id) => {
    if (expandedScooterId === id) {
      setExpandedScooterId(null)
    } else {
      setExpandedScooterId(id)
    }
  }

  const handleRemoveScooter = (id) => {
    console.log('customer removed or something')
    console.log(`scooterid : ${id}`)
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
        {currentScooters.map((scooter) => (
          <React.Fragment key={scooter.id}>
            <ListItem key={scooter.id} disableGutters sx={MuiListItem}>
              <ListItemText primary={`Scooter ${scooter.id}`} />
              <ListItemSecondaryAction>
                <Tooltip title="Inspect scooter">
                  <IconButton
                    edge="end"
                    aria-label="inspect"
                    onClick={() => handleShowDetails(scooter.id)}
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
                    value={scooter.id}
                    onClick={() => handleRemoveScooter(scooter.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
            <Collapse
              in={expandedScooterId === scooter.id}
              timeout="auto"
              unmountOnExit
            >
              <List sx={MuiListCollapse}>
                <ListItem>
                  <ListItemText primary={`Scooter ID: ${scooter.id}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Battery: ${scooter.battery}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Max Speed: ${scooter.maxSpeed}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Available: ${scooter.available}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Long: ${scooter.positionX}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Lat: ${scooter.positionY}`} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Created At: ${formatDateString(
                      scooter.createdAt,
                    )}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Updated At: ${formatDateString(
                      scooter.updatedAt,
                    )}`}
                  />
                </ListItem>
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Container>
  )
}

export default AdminScooter
