import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import about_1 from '../../assets/about_1.png';
import about_2 from "../../assets/about_2.png";
import about_3 from "../../assets/about_3.png";
import about_4 from "../../assets/about_4.png";
import { Navbar } from "../Navbar/Navbar";

const About = () => {
  return (
    <div>
      <Navbar/>
    <Box sx={{ width: "100%", maxWidth: "1252px", margin: "50px 250px 200px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            sx={{
              color: "#072753",
              fontSize: "27px",
              fontWeight: "bold",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
          Buyback Policy
          </Typography>
          <Typography
            sx={{
              color: "#4f6484",
              width: "550px",
            }}
          >
           For products purchased at the store when resold, they will be purchased at the same day gold price for gold products with stones (except diamonds). Will be calculated as [total gold weight] x [time gold price]. For products with precious stones, [original product price] x 85%
           <br/>
           <br/>
For products that do not have to be purchased at the store, there will be a separate buyback policy such as when reselling, they will be purchased at the same day buyback gold price for gold products and stones (except diamonds). . Will be calculated as [total gold weight] x [time gold price]. For products with precious stones, [original product price] x 80%
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            sx={{
              width: "550px",
              height: "300px",
            }}
            alt="Image"
            src={about_1}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} marginTop="30px">
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            sx={{
              width: "550px",
              height: "300px",
            }}
            alt="Image"
            src={about_2}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            sx={{
              color: "#072753",
              fontSize: "27px",
              fontWeight: "bold",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
          Warranty Policy
          </Typography>

          <Typography
            sx={{
              color: "#4f6484",
              width: "550px",
            }}
          >
            For products purchased at the store, the store warranty policy will apply. Customers will enjoy a warranty policy for all products in the order. Warranty period will be based on the total value of the entire order.
          <br/>
          <br/>
          When warrantying a product, please bring the product and warranty card to the counter to receive warranty support from staff according to the store policy.
          
            </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} marginTop="30px">
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            sx={{
              color: "#072753",
              fontSize: "27px",
              fontWeight: "bold",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            A Memorable Experience
          </Typography>
          <Typography
            sx={{
              color: "#4f6484",
              width: "550px",
            }}
          >
          Point accumulation policy when buying products at the store. When purchasing products from the store, when your total bill is over $500, you will have 1 point and will be added to the total bill.
            <br />
            <br /> When a customer has more than 1,000 accumulated points, he or she will become a loyal customer and will receive a 2% discount on the total order value.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            sx={{
              width: "550px",
              height: "300px",
            }}
            alt="Image"
            src={about_3}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} marginTop="30px">
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            sx={{
              width: "550px",
              height: "300px",
            }}
            alt="Image"
            src={about_4}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            sx={{
              color: "#072753",
              fontSize: "27px",
              fontWeight: "bold",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            Get To Know Us
          </Typography>
          <Typography
            sx={{
              color: "#4f6484",width: "550px",
            }}
          >
            Throughout the years, our commitment to customers and the joy we
            share with them remains steadfast. Our studio exudes warmth and
            intimacy, ensuring that each person feels truly special and valued.
            Just like diamonds, our relationships with customers endure,
            celebrating their most cherished milestones with everlasting
            brilliance. Join us in creating unforgettable memories that shine
            bright for a lifetime. Explore our exquisite collection of quality
            diamonds, precious gems, and fine jewelry. Plan your visit today
            schedule an appointment online or call our store at 703-536-3600
            during our store hours. We look forward to working with you.
          </Typography>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
};

export default About;