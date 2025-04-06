import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, Grid, Paper, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function HomePage() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if JWT token exists in localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: '#f8f9fa',
          py: 6,
          borderBottom: '1px solid #e0e0e0'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography 
                variant="h3" 
                component="h1" 
                sx={{ 
                  fontWeight: 600,
                  color: '#0b3d91',
                  mb: 2,
                  fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
                }}
              >
                National Electronic Voting Platform
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#555',
                  mb: 4,
                  fontWeight: 400,
                  lineHeight: 1.6
                }}
              >
                Register online, verify your identity, and cast your vote securely using cutting-edge technology approved by the Election Commission of India.
              </Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <Button 
                    variant="contained" 
                    size="large" 
                    sx={{ 
                      bgcolor: '#0b3d91',
                      textTransform: 'none',
                      px: 4,
                      py: 1.5,
                      fontWeight: 500
                    }}
                    onClick={() => navigate('/verify')} // Add onClick handler
                  >
                    Register to Vote
                  </Button>
                </Grid>
                <Grid item>
                  {isLoggedIn ? (
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: '#0b3d91',
                        color: '#0b3d91',
                        textTransform: 'none',
                        px: 4,
                        py: 1.5,
                        fontWeight: 500
                      }}
                      onClick={() => navigate('/dashboard')}
                    >
                      View Profile
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: '#0b3d91',
                        color: '#0b3d91',
                        textTransform: 'none',
                        px: 4,
                        py: 1.5,
                        fontWeight: 500
                      }}
                      onClick={() => navigate('/login')}
                    >
                      Voter Login
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ textAlign: 'center' }}>
                <img 
                  src="https://dymk4s89vutua.cloudfront.net/wp-content/uploads/2024/07/online_voting.webp?x55987" 
                  alt="Electronic Voting" 
                  style={{ 
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '4px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Information Section */}
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          align="center" 
          sx={{ 
            mb: 4,
            color: '#333',
            fontWeight: 500
          }}
        >
          Key Features
        </Typography>
        
        <Grid container spacing={4}>
          {[
            {
              title: "Secure Authentication",
              description: "Multi-factor authentication system with Aadhaar integration ensures legitimate voters."
            },
            {
              title: "Voting Transparency",
              description: "Blockchain technology guarantees tamper-proof recording of all votes."
            },
            {
              title: "Accessibility",
              description: "Vote from anywhere with internet access, including special provisions for persons with disabilities."
            }
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  border: '1px solid #e0e0e0',
                  borderLeft: '4px solid #0b3d91',
                  borderRadius: '4px'
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2,
                    fontWeight: 500,
                    color: '#0b3d91'
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* Notice Section */}
      <Box sx={{ bgcolor: '#f0f7ff', py: 5 }}>
        <Container maxWidth="lg">
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4,
              borderRadius: '4px',
              backgroundColor: 'white',
              border: '1px solid #e0e0e0'
            }}
          >
            <Typography 
              variant="h5" 
              component="h3" 
              sx={{ 
                mb: 2,
                color: '#0b3d91',
                fontWeight: 500
              }}
            >
              Important Notice
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" paragraph>
              The next general election is scheduled for April 2024. Voter registration closes 15 days before election day. Please ensure your details are updated in the electoral roll.
            </Typography>
            <Button 
              variant="text" 
              sx={{ 
                color: '#0b3d91',
                textTransform: 'none',
                fontWeight: 500,
                p: 0
              }}
            >
              Read complete election schedule →
            </Button>
          </Paper>
        </Container>
      </Box>
      
      <Footer />
    </Box>
  );
}

export default HomePage;