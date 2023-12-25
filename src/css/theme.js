import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#f50057',
    },
    custom: {
      main: '#4caf50',
      dark: '#333333',
      light: '#ffffff',
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          margin: 'auto',
          maxWidth: '800px',
        },
      },
    },
    // add overides here later if we need moer
  },
})

export const MuiContainer = {
  margin: 'auto',
  maxWidth: '800px',
}

export const MuiPaperContainerColumn = {
  marginTop: '25px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  gap: '15px',
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}

export const MuiButton = {
  backgroundColor: '#1976D2',
  color: 'white',
  width: '200px',
  '&:hover': {
    backgroundColor: '#1565C0',
  },
}

export const MuiList = {
  margin: '10px',
  width: '100%',
  bgcolor: 'background.paper',
  color: 'black',
  padding: '10px',
  borderRadius: '8px',
}

export const MuiListCollapse = {
  bgcolor: '#f0f0f0',
}

export const MuiListItem = {
  margin: 'auto',
  bgcolor: 'background.paper',
  color: 'black',
  borderBottom: '1px solid #ccc',
}

export const MuiNavbarButtons = {
  '& .MuiButton-contained': {
    backgroundColor: '#2196F3',
    color: 'white',
    transition: 'background-color 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: '#1565C0',
    },
  },
}

export const MuiBoxHome = {
  backgroundColor: '#003566',
  color: 'white',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
}
