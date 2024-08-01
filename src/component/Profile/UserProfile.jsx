import React, { useEffect } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Button, Box, Typography, Paper, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../State/Authentication/Action";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt && !auth.user) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch(getUser(user));
    }
  }, [auth.user, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fffff",
        padding: "2rem",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: "3rem",
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          borderRadius: "15px",
          backgroundColor: "#ffffff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <AccountBoxIcon
            sx={{ fontSize: "8rem", color: "#007bff", marginBottom: "1rem" }}
          />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: "bold",
              fontFamily: "Roboto, sans-serif",
              color: "#333",
            }}
          >
            {auth.user ? auth.user.fullname : "User Name"}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "red", fontFamily: "Roboto, sans-serif",fontSize: "20px" ,fontWeight: "bold" }}
          >
            {auth.user ? auth.user.areaName : "Area Name"}
          </Typography>
        </Box>

        <Divider sx={{ marginY: "1.5rem" }} />

        <Button
          onClick={handleLogout}
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            backgroundColor: "#007bff",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
            borderRadius: 2,
            boxShadow: "none",
            textTransform: "none",
          }}
        >
          Logout
        </Button>
      </Paper>
    </Box>
  );
};

export default UserProfile;
