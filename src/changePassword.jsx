import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
  Box,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { Icon } from "@iconify/react";
import Swal from 'sweetalert2';

export const ChangePassword = ({ setShowChangePassword, email }) => {
  const [logoutOtherDevices, setLogoutOtherDevices] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypeNewPassword, setRetypeNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // State for password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const handlePreviousClick = (event) => {
    event.preventDefault(); // Prevent form submission
    setShowChangePassword(false);
  };

  const handleLogoutOtherDevicesChange = (event) => {
    setLogoutOtherDevices(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true);
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!$@%])[A-Za-z\d!$@%]{6,}$/; // Adjust regex as needed
    if (!passwordRegex.test(newPassword)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password',
        text: 'New password must be at least 6 characters long and include a combination of letters, numbers, and special characters (!$@%).',
      });
      setLoading(false); // Set loading to false
      return;
    }

    // Check if new password and retype password match
    if (newPassword !== retypeNewPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'New password and re-typed password do not match.',
      });
      setLoading(false); // Set loading to false
      return;
    }


    // API call to change password
    try {
      const formData = {
        email: email,
        currentPassword: currentPassword,
        newPassword: newPassword,
      };
      const url = 'https://sheetdb.io/api/v1/pwyv57nsbzst9'; // Replace with your SheetDB API Key

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: [formData] }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSuccessMessage('Your password has been changed successfully!');
      // Reset the form fields
      setCurrentPassword('');
      setNewPassword('');
      setRetypeNewPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to change password. Please check the console for details.',
      });
    } finally {
      setLoading(false); // Ensure loading is set to false after API call completes
    }
  };


  return (
    <Container
      maxWidth="sm" // Sets the max width to small for mobile view
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Card sx={{ width: '100%', boxShadow: 3, borderRadius: 5 }}>
        <CardContent>
          <Box onClick={handlePreviousClick} sx={{ textAlign: "left", ml: -2, cursor: "pointer" }} >
            <Icon icon="iconamoon:arrow-left-2-light" width="48" height="48" />
          </Box>
          <Typography variant="body1" component="div" align="left" gutterBottom >
            {email}
          </Typography>

          {successMessage ? (
            <Typography variant="body1" color="green" align="left" gutterBottom>
              {successMessage}
            </Typography>
          ) : (
            <>
              <Typography variant="h5" component="div" align="left" gutterBottom sx={{ fontWeight: 600 }}>
                Change password
              </Typography>
              <Typography variant="body1" component="div" align="left" gutterBottom sx={{ py: 1, width: "80%" }} >
                Your password must be at least 6 characters and should include a combination of numbers, letters and special characters(!$@%)
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Current password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowCurrentPassword(!showCurrentPassword)} edge="end">
                            <Icon icon={showCurrentPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    label="New password"
                    type={showNewPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                            <Icon icon={showNewPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />


                  <TextField
                    label="Re-type New password"
                    type={showRetypePassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    required
                    value={retypeNewPassword}
                    onChange={(e) => setRetypeNewPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowRetypePassword(!showRetypePassword)} edge="end">
                            <Icon icon={showRetypePassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={logoutOtherDevices}
                        onChange={handleLogoutOtherDevicesChange}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ fontWeight: 'bold', textAlign: "left" }}>
                        Log out of other devices, choose this if someone else used your account
                      </Typography>
                    }
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    disabled={loading} // Disable button while loading
                    sx={{ mt: 2, textTransform: 'none', borderRadius: 5 }} // Override to prevent uppercase transformation
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" /> // Show CircularProgress
                    ) : (
                      'Change password'
                    )}
                  </Button>
                </Box>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};
