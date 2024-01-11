import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { Link } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize'
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel'
import PaymentsIcon from '@mui/icons-material/Payments'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { MuiNavbarButtons } from '../css/theme'

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{ textDecoration: 'none', color: 'white' }}
        >
          eScooters AB
        </Typography>

        <div style={{ flexGrow: 1 }}></div>
        <Button
          sx={MuiNavbarButtons}
          color="inherit"
          component={Link}
          to="/login"
        >
          <LoginIcon />
          Login
        </Button>
        <Button color="inherit" component={Link} to="/dashboard">
          <DashboardCustomizeIcon />
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/trips">
          <ModeOfTravelIcon />
          Trips
        </Button>
        <Button color="inherit" component={Link} to="/payment">
          <PaymentsIcon />
          Payment
        </Button>
        <Button color="inherit" component={Link} to="/admin">
          <AdminPanelSettingsIcon />
          Admin
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
