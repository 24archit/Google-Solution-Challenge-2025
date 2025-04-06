import React from 'react';
import { Box, Typography, Container, Divider, Grid, Link } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ 
      bgcolor: '#f5f5f5', // Light gray background
      color: '#333',
      mt: 'auto'
    }}>
      <Divider />
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                Government of India
              </Typography>
              <Typography variant="body2">
                Online Voting Platform
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Election Commission of India
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                Important Links
              </Typography>
              <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
                <Typography variant="body2">Electoral Roll</Typography>
              </Link>
              <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
                <Typography variant="body2">Voter Helpline</Typography>
              </Link>
              <Link href="#" color="inherit" display="block">
                <Typography variant="body2">RTI Portal</Typography>
              </Link>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                Contact Us
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Toll-Free Number: 1098
              </Typography>
              <Typography variant="body2">
                Email: contact@eci.gov.in
              </Typography>
            </Grid>
          </Grid>
        </Box>
        
        <Divider sx={{ mt: 2 }} />
        
        <Box sx={{ py: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Election Commission of India. All rights reserved.
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            This site is designed, hosted and maintained by Election Commission of India.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;