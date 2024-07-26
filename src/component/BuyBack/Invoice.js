import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';
import { format } from 'date-fns';

const Invoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { buyback, product, valuation } = location.state;

  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, 'dd/MM/yyyy HH:mm');
    setCurrentDate(formattedDate);
  }, []);

  const handleNavigateHome = () => {
    navigate('/staff/jewelry/Home');
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3} mt={8} mb={8} maxWidth="600px" mx="auto" bgcolor="#E7E6E0">
      <CheckCircleIcon sx={{ fontSize: '4rem', color: green[500], mb: 2 }} />
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Buyback Success
      </Typography>
      <Card sx={{ width: '100%', mt: 2, boxShadow: 3, borderRadius: 2, minHeight: 200 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Customer Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Full Name:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{buyback.fullname}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Mobile:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{buyback.mobile}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Email:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{buyback.email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Date :</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{currentDate}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ width: '100%', mt: 2, boxShadow: 3, borderRadius: 2, minHeight: 200 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Product Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Product Name:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{product.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Category:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{product.jewelryCategory.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Buyback Price:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{valuation.totalPrice} đồng</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNavigateHome}
        sx={{
          mt: 2,
          bgcolor: "#388E3C",
          color: "white",
          fontWeight: "bold",
          height: "40px", // Adjust height as needed
          padding: "8px",
          "&:hover": {
            bgcolor: "#D32F2F",
          },
          "&:focus": {
            bgcolor: "black",
          },
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default Invoice;
