import React, { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Button,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../State/Authentication/Action";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import CartSidebar from "../Cart/CartSidebar";

export const Navbar = () => {
  const { auth, cart } = useSelector((store) => store);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [buyBackAnchorEl, setBuyBackAnchorEl] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar visibility
  const dispatch = useDispatch();
  const { area, menu } = useSelector((store) => store);
  console.log("area", area);
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAccountClick = () => {
    if (auth.user.role === "ROLE_STAFF") {
      navigate("/staff/jewelry/my-profile");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleNavigateToArea = (name, id) => {
    navigate(`/staff/jewelry/area/${name}/${id}`);
  };

  const handleBuyBackClick = (event) => {
    setBuyBackAnchorEl(event.currentTarget);
  };

  const handleBuyBackMenuClose = () => {
    setBuyBackAnchorEl(null);
  };

  return (
    <Box className="navbar-container">
      <div
        className="logo-container"
        onClick={() => navigate("/staff/jewelry/Home")}
      >
        <img alt="Image" src={logo} className="logo" />
      </div>
      <div className="navbar-buttons">
        {["Sale", "BuyBack", "StockGold", "Guarantee"].map((item) => (
          <React.Fragment key={item}>
            {item === "BuyBack" ? (
              <>
                <Button
                  onClick={handleBuyBackClick}
                  sx={{
                    color: "text-sky-300",
                    fontWeight: "bold",
                    fontSize: "17px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span className={"text-sky-500"}>{item}</span>
                  <ArrowDropDownIcon />
                </Button>
                <Menu
                  anchorEl={buyBackAnchorEl}
                  open={Boolean(buyBackAnchorEl)}
                  onClose={handleBuyBackMenuClose}
                  sx={{
                    "& .MuiPaper-root": {
                      backgroundColor: "white",
                      color: "text-sky-300",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      borderRadius: "8px",
                      minWidth: "120px",
                    },
                  }}
                >
                  <MenuItem
                    onClick={() =>
                      (window.location.href = "/staff/jewelry/buy")
                    }
                  >
                    Buy Back
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      (window.location.href = `/staff/jewelry/exchange`)
                    }
                  >
                    Exchange
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                onClick={
                  item === "Sale"
                    ? () => handleNavigateToArea("sale", 1)
                    : () => navigate(`/staff/jewelry/${item.toLowerCase()}`)
                }
                sx={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  backgroundColor: "white",
                }}
              >
                <span className={"text-sky-500"}>{item}</span>
              </Button>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="navbar-icons">
        <div className="avatar-container flex gap-6">
          {auth.user ? (
            <>
              <button
                onClick={handleAvatarClick}
                className="flex items-center gap-2 hover:bg-cyan-50 p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <span>{auth.users.userArea}</span>
              </button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleAccountClick}>Account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton
              onClick={handleLogout}
              sx={{ color: "white", cursor: "pointer" }}
            >
              <PersonIcon />
            </IconButton>
          )}
          {/*Cart*/}
          <IconButton id="cart" onClick={() => setIsSidebarOpen(true)}>
            <Badge badgeContent={cart.cart?.items.length} color="secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a.678.678 0 0 0-.678-.838H5.84M7.5 14.25l-2.4-9h14.4l-2.4 9M9 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM17.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </Badge>
          </IconButton>
        </div>
      </div>
      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </Box>
  );
};
