import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import about_1 from "../../assets/about_1.png";
import about_2 from "../../assets/about_2.png";
import about_3 from "../../assets/about_3.png";
import about_4 from "../../assets/about_4.png";
import { Navbar } from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllPolicies } from "../State/Policy/Action";

const About = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const policy = useSelector((state) => state.policy);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllPolicies(jwt)).then(() => setLoading(false));
  }, [dispatch, jwt]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div
          className="mt-28"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="mt-28">
        <Box
          sx={{ width: "100%", maxWidth: "1252px", margin: "50px 250px 200px" }}
        >
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
                {policy.policies[0].name}
              </Typography>
              <Typography
                sx={{
                  color: "#4f6484",
                  width: "550px",
                }}
              >
                {policy.policies[0].description}
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
                {policy.policies[1].name}
              </Typography>
              <Typography
                sx={{
                  color: "#4f6484",
                  width: "550px",
                }}
              >
                {policy.policies[1].description}
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
                {policy.policies[2].name}
              </Typography>
              <Typography
                sx={{
                  color: "#4f6484",
                  width: "550px",
                }}
              >
                {policy.policies[2].description}
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
                {policy.policies[3].name}
              </Typography>
              <Typography
                sx={{
                  color: "#4f6484",
                  width: "550px",
                }}
              >
                {policy.policies[3].description}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default About;
