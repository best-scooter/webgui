import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';

import { Link, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
//import { useUser } from '../requests/UserContext';
import {
  Category as CategoryIcon,
  Add as AddIcon,
  LockOpen,
} from '@mui/icons-material';


function Navbar() {
  const navigate = useNavigate();

  const searchBarStyle = {
    background: 'white',
    borderRadius: 4,
    paddingLeft: 10,
  };
  

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'white' }}>
          StudyBuddy
        </Typography>
  
        <div style={{ flexGrow: 1 }}></div>  
        <Button color="inherit" component={Link} to="/login">
          <CategoryIcon />
          Login
        </Button>
        <Button color="inherit" component={Link} to="/trips">
          <AddIcon />
          Trips
        </Button>
        <Button color="inherit" component={Link} to="/dashboard">
          <AddIcon />
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/admin">
          <AddIcon />
          Admin
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;