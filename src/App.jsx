import React, { useState } from 'react';
import './App.css';
import { ChangePassword } from './changePassword';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
  Box,
} from '@mui/material';
import { Icon } from "@iconify/react";


function App() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(''); // State to manage email validation errors

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handler for showing the ChangePassword component
  const handleNextClick = (event) => {
    event.preventDefault(); // Prevent form submission

    // Validate the email
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email'); // Show error if invalid
      return;
    }

    setEmailError(''); // Clear any previous errors
    setShowChangePassword(true);
  };

  return (
    <div className="App">
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        {!showChangePassword ? (
          <Card sx={{ width: '100%', boxShadow: 3, borderRadius: 5 }}>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                align="left"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Change password
              </Typography>
              <Typography
                variant="body1"
                component="div"
                align="left"
                gutterBottom
                sx={{ padding: '16px 0', width: '80%' }}
              >
                Enter your email to make changes
              </Typography>
              <form>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    required
                    value={email}
                    onChange={handleEmailChange}
                    error={!!emailError} // Show error state when email is invalid
                    helperText={emailError} // Show the error message
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ mt: 2, textTransform: 'none', borderRadius: 5 }}
                    onClick={handleNextClick} // Handle button click
                    
                  >
                    Next
                    <Icon icon="si:arrow-right-duotone" width="28" height="28" />
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        ) : (
          <ChangePassword setShowChangePassword={setShowChangePassword} email={email} />
        )}
      </Container>
    </div>
  );
}

export default App;
