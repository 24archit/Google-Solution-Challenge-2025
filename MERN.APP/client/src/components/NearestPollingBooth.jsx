import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function NearestPollingBooth({ onNext }) {
  const navigate = useNavigate(); // Initialize useNavigate
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6">Nearest Polling Booth</Typography>
      <Typography>123 Main St, City, Country</Typography>
      <Button variant="contained" onClick={() => {navigate('/')}} sx={{ mt: 2 }}>
        Go to Home Page
      </Button>
    </Box>
  );
}

export default NearestPollingBooth;