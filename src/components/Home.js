import React from 'react'
import { Button, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: '#003566',
          color: 'white',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Welcome to electrical Scooters AB!
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
