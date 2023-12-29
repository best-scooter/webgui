import React from 'react'
import { Button, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { MuiBoxHome } from '../css/theme'

function HomePage() {
  const tok = localStorage.getItem('oAuthToken')
  console.log(tok)

  return (
    <div>
      {/* Hero Section */}
      <Box sx={MuiBoxHome}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Welcome to Electrical Scooters AB!
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Sign up, view your trips and account details
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/login"
        >
          Get Started
        </Button>
      </Box>
    </div>
  )
}

export default HomePage
