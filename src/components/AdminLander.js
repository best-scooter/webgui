import React from 'react'

import { Link } from 'react-router-dom'
import { Button, Card, Container } from '@mui/material'

import { MuiContainer, MuiPaperContainerColumn, MuiButton } from '../css/theme'

const AdminLander = () => {
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
          to="/admin/list"
        >
          List view
        </Button>
        <Button
          sx={MuiButton}
          color="inherit"
          component={Link}
          to="/admin/customer"
        >
          Customer view
        </Button>
      </Card>
    </Container>
  )
}

export default AdminLander
