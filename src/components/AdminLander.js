import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'
import { Button, Card, Container } from '@mui/material'

import { MuiContainer, MuiPaperContainerColumn, MuiButton } from '../css/theme'

import { checkAdmin } from '../functions/checkAdmin'

const AdminLander = () => {
  useEffect(() => {
    //check admin or redirect
    checkAdmin()
  }, [])

  return (
    <Container sx={MuiContainer}>
      <Card sx={MuiPaperContainerColumn}>
        <Button sx={MuiButton} color="inherit" component={Link} to="/admin/map">
          Map view
        </Button>
        <Button
          sx={MuiButton}
          color="inherit"
          component={Link}
          to="/admin/customer"
        >
          Customer view
        </Button>
        <Button
          sx={MuiButton}
          color="inherit"
          component={Link}
          to="/admin/scooter"
        >
          Scooter view
        </Button>
        <Button
          sx={MuiButton}
          color="inherit"
          component={Link}
          to="/admin/stations"
        >
          Zones view
        </Button>
      </Card>
    </Container>
  )
}

export default AdminLander
