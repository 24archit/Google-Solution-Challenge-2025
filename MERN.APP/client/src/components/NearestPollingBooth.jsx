import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function NearestPollingBooth({ onNext }) {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6">Nearest Polling Booth</Typography>
      <Typography>123 Main St, City, Country</Typography>
      <Button variant="contained" onClick={onNext} sx={{ mt: 2 }}>
        Proceed to QR Code Generation
      </Button>
    </Box>
  );
}

export default NearestPollingBooth;