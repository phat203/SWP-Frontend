import React, { useEffect } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Button, Box, Typography, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logout } from '../State/Authentication/Action';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt && !auth.user) {
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch(getUser(user));
    }
  }, [auth.user, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '2rem',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '2rem',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <AccountBoxIcon
            sx={{ fontSize: '8rem', color: '#1976d2', marginBottom: '1rem' }}
          />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              paddingY: '1rem',
              fontWeight: 'bold',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            {auth.user ? auth.user.fullname : ''}
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            sx={{ color: 'gray', fontFamily: 'Roboto, sans-serif' }}
          >
            {auth.user ? auth.user.areaName : ''}
          </Typography>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="primary"
            sx={{
              marginTop: '2rem',
              fontWeight: 'bold',
              height: '40px',
              padding: '8px 24px',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserProfile;
