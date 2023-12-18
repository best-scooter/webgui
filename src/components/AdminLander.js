import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'

const AdminLander = () => {
  return (
    <div className="container">
      <Button
        sx={{ backgroundColor: '#1976D2', color: 'white', margin: '10px' }}
        color="inherit"
        component={Link}
        to="/admin/map"
      >
        Map view
      </Button>
      <Button
        sx={{ backgroundColor: '#1976D2', color: 'white', margin: '10px' }}
        color="inherit"
        component={Link}
        to="/admin/list"
      >
        List view
      </Button>
      <Button
        sx={{ backgroundColor: '#1976D2', color: 'white', margin: '10px' }}
        color="inherit"
        component={Link}
        to="/admin/customer"
      >
        Customer view
      </Button>
    </div>
  )
}

export default AdminLander
