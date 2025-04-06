import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader, 
  Avatar, 
  Divider, 
  Button, 
  TextField, 
  Alert, 
  Box, 
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress
} from '@mui/material';
import { 
  Security, 
  Person, 
  Assignment, 
  Fingerprint, 
  LocationOn, 
  Phone, 
  Email, 
  Badge, 
  CameraAlt,
  QrCodeScanner, 
  Logout,
  Lock
} from '@mui/icons-material';

// Dummy user data for demonstration
const dummyUsers = [
  {
    id: "IN23456789",
    firstName: "Rahul",
    lastName: "Sharma",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    address: "123 Nehru Road, New Delhi, Delhi 110001",
    phone: "+91 98765 43210",
    email: "rahul.sharma@example.com",
    idType: "Aadhaar",
    idNumber: "9876 5432 1098",
    registrationDate: "2023-01-10",
    status: "Active",
    lastAccessed: "2025-04-02",
    profileImage: "https://randomuser.me/api/portraits/men/44.jpg",
    documents: [
      { type: "Aadhaar Card", verified: true, uploadDate: "2023-01-10" },
      { type: "PAN Card", verified: true, uploadDate: "2023-01-10" },
      { type: "Address Proof", verified: true, uploadDate: "2023-01-15" }
    ]
  },
  {
    id: "IN34567890",
    firstName: "Priya",
    lastName: "Patel",
    dateOfBirth: "1988-11-23",
    gender: "Female",
    address: "456 Gandhi Street, Mumbai, Maharashtra 400001",
    phone: "+91 87654 32109",
    email: "priya.patel@example.com",
    idType: "Aadhaar",
    idNumber: "8765 4321 0987",
    registrationDate: "2023-02-15",
    status: "Active",
    lastAccessed: "2025-03-28",
    profileImage: "https://randomuser.me/api/portraits/women/25.jpg",
    documents: [
      { type: "Aadhaar Card", verified: true, uploadDate: "2023-02-15" },
      { type: "PAN Card", verified: true, uploadDate: "2023-02-15" },
      { type: "Address Proof", verified: true, uploadDate: "2023-02-20" }
    ]
  }
];

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Demo authentication - normally this would be a secure API call
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (username === "admin" && password === "demo123") {
        setAuthenticated(true);
        setAuthError("");
      } else {
        setAuthError("Invalid credentials. Demo credentials: admin/demo123");
      }
      setLoading(false);
    }, 1000);
  };
  
  const handleLogout = () => {
    setAuthenticated(false);
    setUsername("");
    setPassword("");
    setCurrentUser(null);
  };
  
  // Function to simulate QR code scanning
  const handleQrScan = () => {
    setScanning(true);
    setLoading(true);
    
    // Simulate scanning and API call
    setTimeout(() => {
      // Randomly select a user from dummy data
      const randomUser = dummyUsers[Math.floor(Math.random() * dummyUsers.length)];
      setCurrentUser(randomUser);
      setScanning(false);
      setLoading(false);
    }, 2000);
  };
  
  if (!authenticated) {
    return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
            <Security fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
            Government Admin Portal
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
            Secure Citizen Information System
          </Typography>
          
          {authError && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {authError}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>
            <Alert severity="info" sx={{ mt: 2 }}>
              Demo credentials
              <br />
              <strong>Username:</strong> admin
              <br />
              <strong>Password:</strong> demo123
            </Alert>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8 }}>
          © {new Date().getFullYear()} Government Citizen Database Portal
        </Typography>
      </Container>
    );
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#0b3d91' }}>
        <Toolbar>
          <Security sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Government Admin Portal
          </Typography>
          <Chip 
            icon={<Person />} 
            label="Admin" 
            color="primary" 
            variant="outlined" 
            sx={{ mr: 2, backgroundColor: 'white' }} 
          />
          <Button color="inherit" onClick={handleLogout} startIcon={<Logout />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper 
              sx={{ 
                p: 2, 
                display: 'flex', 
                flexDirection: 'column',
                border: '1px solid #e0e0e0',
                borderRadius: 2
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Citizen Information Lookup
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<QrCodeScanner />}
                  onClick={handleQrScan}
                  disabled={scanning}
                >
                  {scanning ? "Scanning..." : "Scan QR Code"}
                </Button>
              </Box>
              <Alert severity="info" sx={{ mb: 2 }}>
                For demonstration purposes, clicking "Scan QR Code" will load random user data.
              </Alert>
              
              {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                  <CircularProgress />
                </Box>
              )}
              
              {currentUser && !loading ? (
                <>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Card sx={{ height: '100%' }}>
                        <CardHeader
                          title="Citizen Profile"
                          subheader={`ID: ${currentUser.id}`}
                          avatar={
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              <Person />
                            </Avatar>
                          }
                        />
                        <Divider />
                        <CardContent>
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                            <Avatar
                              src={currentUser.profileImage}
                              sx={{ width: 120, height: 120, mb: 2 }}
                            />
                            <Typography variant="h6">
                              {currentUser.firstName} {currentUser.lastName}
                            </Typography>
                            <Chip
                              label={currentUser.status}
                              color={currentUser.status === "Active" ? "success" : "error"}
                              size="small"
                              sx={{ mt: 1 }}
                            />
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            <Badge sx={{ mr: 1 }} fontSize="small" /> ID Type: {currentUser.idType}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            <Fingerprint sx={{ mr: 1 }} fontSize="small" /> ID Number: {currentUser.idNumber}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            <Assignment sx={{ mr: 1 }} fontSize="small" /> Registered: {currentUser.registrationDate}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            <CameraAlt sx={{ mr: 1 }} fontSize="small" /> Last Accessed: {currentUser.lastAccessed}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} md={8}>
                      <Card sx={{ mb: 3 }}>
                        <CardHeader 
                          title="Personal Information" 
                          avatar={
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              <Person />
                            </Avatar>
                          }
                        />
                        <Divider />
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2">Full Name</Typography>
                              <Typography variant="body1">{currentUser.firstName} {currentUser.lastName}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2">Date of Birth</Typography>
                              <Typography variant="body1">{currentUser.dateOfBirth}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2">Gender</Typography>
                              <Typography variant="body1">{currentUser.gender}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="subtitle2">Address</Typography>
                              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocationOn fontSize="small" sx={{ mr: 1 }} />
                                {currentUser.address}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2">Phone</Typography>
                              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                                <Phone fontSize="small" sx={{ mr: 1 }} />
                                {currentUser.phone}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2">Email</Typography>
                              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                                <Email fontSize="small" sx={{ mr: 1 }} />
                                {currentUser.email}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader 
                          title="Verified Documents" 
                          avatar={
                            <Avatar sx={{ bgcolor: '#0b3d91' }}>
                              <Assignment />
                            </Avatar>
                          }
                        />
                        <Divider />
                        <CardContent>
                          <TableContainer>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Document Type</TableCell>
                                  <TableCell>Upload Date</TableCell>
                                  <TableCell>Status</TableCell>
                                  <TableCell align="right">Action</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {currentUser.documents.map((doc, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{doc.type}</TableCell>
                                    <TableCell>{doc.uploadDate}</TableCell>
                                    <TableCell>
                                      <Chip 
                                        label={doc.verified ? "Verified" : "Pending"}
                                        color={doc.verified ? "success" : "warning"}
                                        size="small"
                                      />
                                    </TableCell>
                                    <TableCell align="right">
                                      <Button size="small" variant="outlined">View</Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </>
              ) : !loading && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
                  <Lock sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    No user data to display
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Click "Scan QR Code" to retrieve citizen information
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
        <Box pt={4}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Government Citizen Database Portal - For authorized personnel only
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Admin;