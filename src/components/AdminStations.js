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
  Paper,
  Typography,
} from '@mui/material'

// Icons from Mui
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandIcon from '@mui/icons-material/Expand'

// custom sx styles packed as classes
import {
  MuiPaperContainerColumn,
  MuiList,
  MuiListItem,
  MuiListCollapse,
  MuiButtonForm,
} from '../css/theme'
import './Login.css'
import '../css/List.css'

// custom functions
import { delScooter, putScooter } from '../functions/fetchScooters'
import { Customfilter, formatDateString } from '../functions/helpers'
import Pagination from '../sub-components/Pagination'
import { checkAdmin } from '../functions/checkAdmin'
import { formStringsToIntegers } from '../functions/helpers'
import { getZones } from '../functions/fetchZones'
import { getParking } from '../functions/fetchParkings'

const AdminStations = () => {
  // todo fix var names holy shit
  const [zones, setZones] = useState([])
  const [parking, setParking] = useState([])

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  // Collapse/Edit
  const [expandedScooterId, setExpandedScooterId] = useState(null)
  const [editedScooter, setEditedScooter] = useState({})
  const [expandedZoneScooters, setExpandedZoneScooters] = useState([])

  //Setting the data for pagination
  const itemsPerPage = 100
  const buttons = 5
  const displayedScooters = searchQuery ? searchResults : zones
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentScooters = displayedScooters.slice(
    indexOfFirstItem,
    indexOfLastItem,
  )
  const totalPages = Math.ceil(displayedScooters.length / itemsPerPage)
  // Excluded from Edit list
  const excludedAttributes = ['scooterId', 'id', 'createdAt', 'updatedAt']

  // Getting customers
  useEffect(() => {
    //check admin or redirect
    checkAdmin()
    const fetchCustomers = async () => {
      try {
        //const fetchedCustomers = await getScooters()
        //setScooters(fetchedCustomers.data)
      } catch (error) {
        console.error('Error fetching customers:', error)
      }
    }
    const fetchZones = async () => {
      try {
        const zonesResponse = await getZones()
        console.log('zones', zonesResponse)
        setZones(zonesResponse.data)
      } catch (error) {
        console.error('frontend error getting zones', error)
      }
    }
    const fetchParking = async () => {
      try {
        const parking = await getParking()
        console.log('parking', parking.data)
        setParking(parking.data)
      } catch (error) {
        console.error('frontend error getting zones', error)
      }
    }

    fetchParking()
    fetchZones()
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
      if (zones.length > 0) {
        const result = Customfilter(zones, searchQuery)
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

  //Editing the shown details
  const handleInputChange = (field, value) => {
    setEditedScooter({
      ...editedScooter,
      [field]: value,
    })
  }

  //Sending Edited details
  const handleSubmit = (event, scooterId) => {
    event.preventDefault()
    //converting form strings to integers returneds as a json object
    const fixedformdata = formStringsToIntegers(editedScooter)
    putScooter(scooterId, fixedformdata)
    setEditedScooter(null)
  }

  const handleRemoveScooter = (id) => {
    console.log('customer removed or something')
    console.log(`scooterid : ${id}`)
    delScooter(id)
  }

  useEffect(() => {
    const filteredParkingsByMatchingZone = parking.filter(
      (parking) => parking.zoneId === expandedScooterId,
    )
    console.log(filteredParkingsByMatchingZone)
    setExpandedZoneScooters(filteredParkingsByMatchingZone)
  }, [expandedScooterId])

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
        {currentScooters.map((scooter) => (
          <React.Fragment key={scooter.id}>
            <ListItem key={scooter.id} disableGutters sx={MuiListItem}>
              <ListItemText
                primary={`Zone ${scooter.id} - ${scooter.name} - Type ${scooter.type}`}
              />
              <ListItemSecondaryAction>
                <Tooltip title="Expand Scooter">
                  <IconButton
                    edge="end"
                    aria-label="expand"
                    onClick={() => handleShowDetails(scooter.id)}
                  >
                    <ExpandIcon />
                  </IconButton>
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
              <form onSubmit={(event) => handleSubmit(event, scooter.id)}>
                <List sx={MuiListCollapse} style={{ display: 'flex' }}>
                  <div style={{ flex: 1 }}>
                    {/* Map through the items attributes to create the text fields */}
                    {Object.keys(scooter).map((attribute) => {
                      if (!excludedAttributes.includes(attribute)) {
                        return (
                          <ListItem key={attribute}>
                            <TextField
                              label={
                                attribute.charAt(0).toUpperCase() +
                                attribute.slice(1)
                              }
                              defaultValue={scooter[attribute]}
                              onChange={(e) =>
                                handleInputChange(attribute, e.target.value)
                              }
                            />
                          </ListItem>
                        )
                      }
                      return null // skips rendering empty ListItem div ^^
                    })}
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
                    <Button sx={MuiButtonForm} type="submit">
                      Save Changes
                    </Button>
                  </div>{' '}
                  {/*make into class if i have the energy*/}
                  <Paper
                    elevation={3}
                    style={{
                      maxHeight: 300,
                      minWidth: 500,
                      overflow: 'auto',
                      padding: '10px',
                      marginRight: '10px',
                    }}
                  >
                    <List>
                      <Typography
                        variant="h6"
                        style={{ borderBottom: '1px solid #ccc' }}
                        gutterBottom
                      >
                        Scooters in Zone
                      </Typography>
                      {expandedZoneScooters.map((scooter) => (
                        <ListItem key={scooter.scooterId} disablePadding>
                          <ListItemText
                            primary={`Scooter ${scooter.scooterId}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </List>
              </form>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Container>
  )
}

export default AdminStations
