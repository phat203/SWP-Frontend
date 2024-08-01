import React from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
const BuyBack = () => {
  // Dummy data for demonstration
  const data = [
    { id: 1, itemName: "Gold Ring", buyPrice: "$500", exchangePrice: "$450" },
    {
      id: 2,
      itemName: "Diamond Necklace",
      buyPrice: "$1200",
      exchangePrice: "$1100",
    },
    {
      id: 3,
      itemName: "Silver Bracelet",
      buyPrice: "$300",
      exchangePrice: "$280",
    },
    // Add more data as needed
  ];

  return (
    <div>
      <Navbar />
      <Box
        textAlign="center"
        sx={{ padding: 3, marginTop: "80px", marginBottom: "80px" }}
      >
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              sx={{
                bgcolor: "#0B4CBB",
                py: 2,
                mb: 4,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Choose an Option
            </Typography>
            <Box display="flex" justifyContent="center" sx={{ mb: 4 }}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/staff/jewelry/buy"
                sx={{
                  bgcolor: "#4CAF50", // Green color
                  color: "white", // Text color
                  fontWeight: "bold",
                  padding: "12px 24px",
                  borderRadius: 8,
                  textTransform: "capitalize", // Preserve capitalization
                  "&:hover": {
                    bgcolor: "#388E3C", // Darker green on hover
                  },
                }}
              >
                Buy
              </Button>
              <Box mx={2} />
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/staff/jewelry/exchange"
                sx={{
                  bgcolor: "#F44336", // Red color
                  color: "white", // Text color
                  fontWeight: "bold",
                  padding: "12px 24px",
                  borderRadius: 8,
                  textTransform: "capitalize", // Preserve capitalization
                  "&:hover": {
                    bgcolor: "#D32F2F", // Darker red on hover
                  },
                }}
              >
                Exchange
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <TableContainer
              component={Paper}
              sx={{ maxWidth: 800, margin: "0 auto" }}
            >
              <Table sx={{ minWidth: 600 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                      Item Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                      Buy Price
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                      Exchange Price
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell>{item.buyPrice}</TableCell>
                      <TableCell>{item.exchangePrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default BuyBack;
