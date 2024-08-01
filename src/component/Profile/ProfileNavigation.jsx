import React from "react";
import { Dashboard } from "@mui/icons-material";
import {
  AccountBalanceWallet as AccountBalanceWalletIcon,
  ShoppingBag as ShoppingBagIcon,
  Favorite as FavoriteIcon,
  NotificationsActive as NotificationsActiveIcon,
  Event as EventIcon,
  Logout as LogoutIcon,
  AddReaction as AddReactionIcon,
} from "@mui/icons-material";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../State/Authentication/Action";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import logo from "../../assets/logo.png";

const menu = [
  { title: "Dashboard", icon: <Dashboard />, path: "/staff/jewelry/dashboard" },
  { title: "Orders", icon: <ShoppingBagIcon /> },
  {
    title: "Buyback",
    icon: <ShoppingCartCheckoutIcon />,
    path: "/staff/jewelry/buyback",
  },
  { title: "Event", icon: <EventIcon /> },
  { title: "Logout", icon: <LogoutIcon sx={{ color: "red" }} /> },
];

const Logo = styled("img")({
  height: 150,
  width: 150,
  backgroundColor: "#003366",
  borderRadius: "50%",
  border: "5px solid #EEBF0D",
});

const ProfileNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/");
    } else {
      navigate(`/staff/jewelry/my-profile/${item.title.toLowerCase()}`);
    }
  };

  const handleLogoClick = () => {
    navigate("/staff/jewelry/Home");
  };

  return (
    <Drawer
      variant={isSmallScreen ? "temporary" : "permanent"}
      onClose={handleClose}
      open={isSmallScreen ? open : true}
      anchor="left"
      sx={{
        "& .MuiDrawer-paper": {
          width: isSmallScreen ? "75vw" : "20vw",
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 2,
          cursor: "pointer",
        }}
        onClick={handleLogoClick}
      >
        <Logo src={logo} alt="Logo" style={{ width: "40%", height: "80%" }} />
      </Box>
      <List sx={{ pt: 0 }}>
        {menu.map((item, i) => (
          <React.Fragment key={item.title}>
            <ListItem
              button
              onClick={() => handleNavigate(item)}
              sx={{
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#003366" }}>
                {React.cloneElement(item.icon, { fontSize: "large" })}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", color: "#003366" }}
                  >
                    {item.title}
                  </Typography>
                }
              />
            </ListItem>
            {i !== menu.length - 1 && <Divider sx={{ my: 0.5 }} />}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default ProfileNavigation;
