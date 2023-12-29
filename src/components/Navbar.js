import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { Link } from 'react-router-dom'
//import PersonIcon from '@mui/icons-material/Person';
import { Category as CategoryIcon, Add as AddIcon } from '@mui/icons-material'
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
          <CategoryIcon />
          Login
        </Button>
        <Button color="inherit" component={Link} to="/dashboard">
          <AddIcon />
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/trips">
          <AddIcon />
          Trips
        </Button>
        <Button color="inherit" component={Link} to="/payment">
          <AddIcon />
          Payment
        </Button>
        <Button color="inherit" component={Link} to="/admin">
          <AddIcon />
          Admin
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
