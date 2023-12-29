import React, { useEffect } from 'react'
import { Button, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { MuiBoxHome } from '../css/theme'

function WsTest() {
  useEffect(() => {
    const token = localStorage.getItem('oAuthToken')
    console.log(token)
    const socket = new WebSocket('ws://localhost:8081', token)
    // Event listener for handling incoming messages
    socket.onmessage = (event) => {
      console.log('Received:', event.data)
    }

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error)
    }

    socket.onopen = () => {
      console.log('WebSocket Connected')
      //subscriptions: ['trip', 'scooter', 'customer'],

      const data = {
        message: 'subscribe',
        subscriptions: ['scooter'],
      }
      socket.send(JSON.stringify(data)) // Convert object to string
    }

    socket.onclose = () => {
      console.log('WebSocket Connection Closed')
    }

    return () => {
      console.log('Cleaning up WebSocket Connection')
      socket.close()
    }
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <Box sx={MuiBoxHome}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Here im testing websocket bullshit
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          hi
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

export default WsTest
