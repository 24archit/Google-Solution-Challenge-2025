import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Grid, 
  Divider, 
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

function UserInfo({ userInfo, onNext }) {
  return (
    <Box sx={{ mt: 2 }}>
      <Paper 
        elevation={0} 
        variant="outlined" 
        sx={{ 
          p: 3, 
          borderRadius: 1, 
          borderColor: '#e0e0e0',
          backgroundColor: '#f9f9f9',
          mb: 3
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            sx={{ 
              bgcolor: '#0b3d91', 
              color: 'white',
              width: 48,
              height: 48,
              mr: 2
            }}
          >
            <PersonIcon />
          </Avatar>
          <Typography variant="h6" sx={{ color: '#0b3d91', fontWeight: 500 }}>
            Voter Information Verified
          </Typography>
        </Box>
        
        <Typography 
          variant="body2" 
          sx={{ mb: 3, color: '#555' }}
        >
          We have verified your identity based on the EPIC Number provided. Please review your information below and confirm it is correct before proceeding to the biometric verification step.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined" sx={{ height: '100%', borderColor: '#e0e0e0' }}>
              <CardContent>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: '#555', 
                    mb: 1,
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    letterSpacing: '0.5px'
                  }}
                >
                  Personal Details
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <Typography variant="body2" color="text.secondary">Full Name:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2" fontWeight={500}>{userInfo.Name}</Typography>
                  </Grid>
                  
                  <Grid item xs={5}>
                    <Typography variant="body2" color="text.secondary">Date of Birth:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2" fontWeight={500}>{userInfo["Date Of Birth"]}</Typography>
                  </Grid>
                  
                  <Grid item xs={5}>
                    <Typography variant="body2" color="text.secondary">EPIC Number:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography 
                      variant="body2" 
                      fontWeight={500}
                      sx={{
                        bgcolor: 'rgba(11, 61, 145, 0.08)',
                        display: 'inline-block',
                        px: 1,
                        py: 0.5,
                        borderRadius: 0.5,
                        letterSpacing: '0.5px'
                      }}
                    >
                      {userInfo["Voter ID"]}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Card variant="outlined" sx={{ height: '100%', borderColor: '#e0e0e0' }}>
              <CardContent>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: '#555', 
                    mb: 1,
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    letterSpacing: '0.5px'
                  }}
                >
                  Residential Details
                </Typography>
                
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="text.secondary">Address:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2" fontWeight={500}>{userInfo.Address}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 3
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Next step: Biometric verification to confirm your identity
        </Typography>
        <Button 
          variant="contained" 
          onClick={onNext} 
          endIcon={<FingerprintIcon />}
          sx={{ 
            backgroundColor: '#0b3d91',
            '&:hover': {
              backgroundColor: '#072a64',
            },
            borderRadius: 1,
            py: 1,
            px: 3
          }}
        >
          Proceed to Biometric Verification
        </Button>
      </Box>
    </Box>
  );
}

export default UserInfo;