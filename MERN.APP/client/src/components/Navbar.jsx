import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import logo from '../assets/logo.png'; // Assuming you have a logo image

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
              src={logo} 
              alt="Logo" 
              width="150" 
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
            Election Commission of India
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;