import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Alert } from '@mui/material';

function AdditionalDetailsForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !dob || !address || !aadhaarNumber) {
      setError('All fields are required.');
      return;
    }

    setError(null); // Clear any previous errors
    onSubmit(); // Simulate submission
  };

  return (
    <Paper elevation={2} sx={{ p: 4, borderRadius: 2, backgroundColor: '#f9f9f9' }}>
      <Typography variant="h5" align="center" gutterBottom sx={{ color: '#0b3d91', fontWeight: 500 }}>
        Additional Details Required
      </Typography>

      <Typography variant="body1" align="center" sx={{ mb: 3 }}>
        Your voter ID number was not found in our records. Please enter your information below to proceed to the next step.
      </Typography>

      {/* Display error message if validation fails */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Date of Birth"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          sx={{ mb: 2 }}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          sx={{ mb: 2 }}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Aadhaar Number"
          value={aadhaarNumber}
          onChange={(e) => setAadhaarNumber(e.target.value)}
          required
          sx={{ mb: 2 }}
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            py: 1.5,
            borderRadius: 1,
            backgroundColor: '#0b3d91',
            '&:hover': {
              backgroundColor: '#072a64',
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Paper>
  );
}

export default AdditionalDetailsForm;