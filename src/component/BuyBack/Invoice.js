import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Grid, Button, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { getBuybackById } from '../State/Buyback/Action';

const Invoice = () => {
  const { buyBackId } = useParams();
  const buyback = useSelector((state) => state.buyback.buyback);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (buyBackId) {
      dispatch(getBuybackById({ buyBackId, jwt })).then(() => {
        setLoading(false);
      });
    }
  }, [buyBackId, dispatch, jwt]);

  const handleNavigateHome = () => {
    navigate('/staff/jewelry/Home');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const transactionDate = new Date(buyback.transactionDate);
  const formattedDate = format(transactionDate, 'dd/MM/yyyy HH:mm');

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3} mt={8} mb={8} maxWidth="600px" mx="auto" bgcolor="#E7E6E0">
      <CheckCircleIcon sx={{ fontSize: '4rem', color: green[500], mb: 2 }} />
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Buyback Success
      </Typography>
      <Card sx={{ width: '100%', mt: 2, boxShadow: 3, borderRadius: 2, minHeight: 200 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Customer Information
          </Typography>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            BuybackID : {buyback.id}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Full Name:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{buyback.customer.fullname}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Mobile:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{buyback.customer.mobile}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Email:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{buyback.customer.email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Date :</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{formattedDate}</Typography>
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
              <Typography variant="body1">{buyback.jewelry.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Category:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{buyback.jewelry.jewelryCategory.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Buyback Price:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">${buyback.buybackPrice}</Typography>
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
