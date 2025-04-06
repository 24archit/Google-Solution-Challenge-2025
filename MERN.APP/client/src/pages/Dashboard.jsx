import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Paper, Divider, Alert } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const navigate = useNavigate();
  const [epicNo, setEpicNo] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const storedEpicNo = localStorage.getItem('epicNo');
    const storedQrCode = localStorage.getItem('qrCodeData'); // Should now be a Base64 image

    if (storedEpicNo) setEpicNo(storedEpicNo);
    if (storedQrCode?.startsWith("data:image/png;base64,")) { 
      setQrCode(storedQrCode); // Use the Base64 image
    } else {
      console.error("Invalid QR Code data found in local storage.");
    }

    setIsVerified(true);
  }, [navigate]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f0f7ff' }}>
      <Navbar />
      
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', py: 6 }}>
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: '100%', borderRadius: '8px', backgroundColor: 'white' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#0b3d91', textAlign: 'center' }}>
            Voter Dashboard
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ fontWeight: 500, mb: 1, color: '#333' }}>
            Profile Information
          </Typography>
          <Typography variant="body1"><strong>Voter ID:</strong> {epicNo || 'N/A'}</Typography>
          <Typography variant="body1"><strong>Polling Booth:</strong> Government High School, Delhi</Typography>
          <Typography variant="body1"><strong>Voting Date:</strong> April 20, 2024</Typography>

          <Divider sx={{ my: 2 }} />

          {isVerified ? (
            qrCode ? (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 1, color: '#0b3d91' }}>
                  Your QR Code
                </Typography>
                <img 
                  src={qrCode} 
                  alt="QR Code" 
                  style={{ width: '80%', height: 'auto', borderRadius: '4px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} 
                />
              </Box>
            ) : (
              <Alert severity="info" sx={{ my: 2 }}>
                Your QR code is not available. Please generate it.
              </Alert>
            )
          ) : (
            <Alert severity="warning" sx={{ my: 2 }}>
              Your account is not verified. Please complete verification to access voting services.
            </Alert>
          )}

          <Button 
            variant="contained" 
            sx={{ mt: 3, bgcolor: '#0b3d91', textTransform: 'none', fontWeight: 500, width: '100%' }}
            onClick={() => navigate('/')}
          >
            Go Back to Home
          </Button>
        </Paper>
      </Box>

      <Footer />
    </Box>
  );
};

export default Dashboard;
