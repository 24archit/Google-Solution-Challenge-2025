import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import governmentLogo from '../assets/Emblem.png';

function Navbar() {
  return (
    <AppBar position="static" sx={{ 
      backgroundColor: '#0b3d91', // Navy blue - formal government color
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* National emblem or logo could go here */}
          <Box sx={{ mr: 2 }}>
            <img 
              src={governmentLogo} 
              alt="Government Emblem" 
              width="43" 
              height="50"
            />
          </Box>
          
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 500,
              letterSpacing: '0.5px',
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            Voter Guard | Election Commission of India
          </Typography>
          
          <Button 
            color="inherit" 
            sx={{ 
              mx: 1, 
              fontWeight: 500,
              textTransform: 'none'
            }}
          >
            Register
          </Button>
          
          <Button 
            color="inherit"
            variant="outlined" 
            sx={{ 
              borderColor: 'rgba(255,255,255,0.5)',
              fontWeight: 500,
              textTransform: 'none'
            }}
          >
            Login
          </Button>̥
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;