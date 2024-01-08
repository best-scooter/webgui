import React, { useEffect, useRef } from 'react'
import { Button, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { MuiBoxHome } from '../css/theme'

function WsTest() {
  const socketRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem('oAuthToken')
    console.log(token)
    socketRef.current = new WebSocket('ws://localhost:8081', token)

    socketRef.current.onmessage = (event) => {
      console.log('Received:', event.data)
    }

    socketRef.current.onerror = (error) => {
      console.error('WebSocket Error:', error)
    }

    socketRef.current.onopen = () => {
      console.log('WebSocket Connected')
      const data = {
        message: 'subscribe',
        subscriptions: ['scooter', 'customer'],
      }
      socketRef.current.send(JSON.stringify(data))
    }

    socketRef.current.onclose = () => {
      console.log('WebSocket Connection Closed')
    }

    return () => {
      console.log('Cleaning up WebSocket Connection')
      socketRef.current.close()
    }
  }, [])

  const sendMessage = () => {
    const messageToSend = JSON.stringify({
      message: 'customer',
      customerId: 1,
      positionX: 123.1,
      positionY: 456.1,
    })
    socketRef.current.send(messageToSend)
  }

  return (
    <div>
      {/* Hero Section */}
      <Box sx={MuiBoxHome}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Here Im testing WebSocket
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          hi
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={sendMessage}
        >
          Send Message
        </Button>
        <Button
          variant="contained"
          color="secondary"
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
