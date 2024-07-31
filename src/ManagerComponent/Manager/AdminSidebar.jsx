import {
    Category,
    Checklist,
    Dashboard,
    Diamond, Event,
    Group,
    Home,
    Logout,
    Menu as MenuIcon,
    ShopTwo,
    ShoppingBag,
    ShoppingCartCheckout
} from '@mui/icons-material';
import PolicyIcon from '@mui/icons-material/Policy';
import InventoryIcon from '@mui/icons-material/Inventory';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import StorefrontIcon from '@mui/icons-material/Storefront';
import {
    Box,
    Collapse,
    Divider, Drawer,
    IconButton,
    List, ListItem, ListItemIcon, ListItemText,
    Typography, useMediaQuery,
    useTheme
} from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { logout } from '../../component/State/Authentication/Action';


const menu = [
   { title: "Home", icon: <Home />, path: "/" },
   { title: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
   { title: "Orders", icon: <ShoppingBag />, path: "/orders" },
   { title: "Buyback", icon: <ShoppingCartCheckout />, path: "/buyback" },
   { title: "Customer", icon: <Checklist />, path: "/customer" },
   { title: "Instock", icon: <StorefrontIcon />, path: "/instock" },
   { title: "OutStock", icon: <InventoryIcon />, path: "/outstock" },
   { title: "Category", icon: <Category />, path: "/category" },
   { title: "Ingredients", icon: <Diamond />, path: "/ingredients" },
   { title: "Staff", icon: <Group />, path: "/teams" },
   { title: "Policy", icon: <PolicyIcon />, path: "/policy" },
   { title: "Events", icon: <Event />, path: "/event" },
   { title: "Area", icon: <PermMediaIcon />, path: "/area" },
   { title: "Logout", icon: <Logout sx={{ color: 'red' }} />, path: "/logout" },
];


const Logo = styled("img")({
   height: 300, // Tăng giá trị height để phóng to ảnh
   width: 300, // Thêm width để giữ tỷ lệ
   backgroundColor: "#003366",
   borderRadius: "100%",
   border: "5px solid #EEBF0D",
 });


const AdminSidebar = () => {
   const isSmallScreen = useMediaQuery("(max-width:1080px)");
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [drawerOpen, setDrawerOpen] = useState(false);
   const [showAdditionalIcons, setShowAdditionalIcons] = useState(false);
   const [showMenuIcons, setShowMenuIcons] = useState(false);
   const theme = useTheme();


   const handleNavigate = (item) => {
       if (item.title === "Logout") {
           dispatch(logout());
           navigate("/");
       } else {
           navigate(`/manager/jewelry${item.path}`);
       }
       if (isSmallScreen) setDrawerOpen(false);
   };


   const handleLogoClick = () => {
       navigate("/manager/jewelry");
       if (isSmallScreen) setDrawerOpen(false);
   };


   const handleHomeClick = () => {
       setShowAdditionalIcons(!showAdditionalIcons);
   };


   const handleMenuClick = () => {
       setShowMenuIcons(!showMenuIcons);
   };


   return (
       <Box sx={{ display: 'flex' }}>
           {isSmallScreen && (
               <IconButton
                   onClick={() => setDrawerOpen(true)}
                   sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300 }}
               >
                   <MenuIcon fontSize="large" />
               </IconButton>
           )}
           <Drawer
               variant={isSmallScreen ? "temporary" : "permanent"}
               open={drawerOpen}
               onClose={() => setDrawerOpen(false)}
               anchor='left'
               sx={{ zIndex: 1200 }}
           >
               <Box
                   sx={{
                       width: isSmallScreen ? '70vw' : '15vw',
                       height: '100%',
                       display: 'flex',
                       flexDirection: 'column',
                       alignItems: 'center',
                       backgroundColor: "#FFFF",
                       color: 'white',
                       p: 2,
                   }}
               >
                   <Box
                       onClick={handleLogoClick}
                       sx={{
                           width: '100%',
                           display: 'flex',
                           justifyContent: 'center',
                           alignItems: 'center',
                           py: 2,
                           cursor: 'pointer',
                       }}
                   >
                       <Logo src={logo} alt="Logo"  style={{ width: '60%', height: '80%' }} />
                   </Box>
                   <Divider sx={{ width: '100%', mb: 2, backgroundColor: 'white' }} />
                   <List sx={{ width: '100%' }}>
                       <ListItem
                           button
                           onClick={handleHomeClick}
                           sx={{
                               '&:hover': {
                                   backgroundColor: "#91BAFF",
                               },
                               transition: 'all 0.3s',
                               mb: 1,
                           }}
                       >
                           <ListItemIcon sx={{ color: "#003366" }}>
                               <Home />
                           </ListItemIcon>
                           <ListItemText
                               primary={
                                   <Typography
                                       variant="subtitle1"
                                       sx={{color: "Black", fontWeight: 'bold' }}
                                   >
                                       Home
                                   </Typography>
                               }
                           />
                       </ListItem>
                       <Collapse in={showAdditionalIcons} timeout="auto" unmountOnExit>
                           {menu.slice(1, 5).map((item, i) => (
                               <ListItem
                                   button
                                   key={i}
                                   onClick={() => handleNavigate(item)}
                                   sx={{
                                       '&:hover': {
                                           backgroundColor: "#91BAFF",
                                       },
                                       transition: 'all 0.3s',
                                       mb: 1,
                                   }}
                               >
                                   <ListItemIcon sx={{ color: "#003366" }}>
                                       {item.icon}
                                   </ListItemIcon>
                                   <ListItemText
                                       primary={
                                           <Typography
                                               variant="subtitle1"
                                               sx={{color: "Black", fontWeight: 'bold' }}
                                           >
                                               {item.title}
                                           </Typography>
                                       }
                                   />
                               </ListItem>
                           ))}
                       </Collapse>
                       <ListItem
                           button
                           onClick={handleMenuClick}
                           sx={{
                               '&:hover': {
                                   backgroundColor: "#91BAFF",
                               },
                               transition: 'all 0.3s',
                               mb: 1,
                           }}
                       >
                           <ListItemIcon sx={{ color: "#003366" }}>
                               <ShopTwo />
                           </ListItemIcon>
                           <ListItemText
                               primary={
                                   <Typography
                                       variant="subtitle1"
                                       sx={{color: "Black", fontWeight: 'bold' }}
                                   >
                                       Menu
                                   </Typography>
                               }
                           />
                       </ListItem>
                       <Collapse in={showMenuIcons} timeout="auto" unmountOnExit>
                           {menu.slice(5, 11).map((item, i) => (
                               <ListItem
                                   button
                                   key={i}
                                   onClick={() => handleNavigate(item)}
                                   sx={{
                                       '&:hover': {
                                           backgroundColor: "#91BAFF",
                                       },
                                       transition: 'all 0.3s',
                                       mb: 1,
                                   }}
                               >
                                   <ListItemIcon sx={{ color: "#003366" }}>
                                       {item.icon}
                                   </ListItemIcon>
                                   <ListItemText
                                       primary={
                                           <Typography
                                               variant="subtitle1"
                                               sx={{color: "Black", fontWeight: 'bold' }}
                                           >
                                               {item.title}
                                           </Typography>
                                       }
                                   />
                               </ListItem>
                           ))}
                       </Collapse>
                       {menu.slice(11).map((item, i) => (
                           <ListItem
                               button
                               key={i}
                               onClick={() => handleNavigate(item)}
                               sx={{
                                   '&:hover': {
                                       backgroundColor: "#91BAFF",
                                   },
                                   transition: 'all 0.3s',
                                   mb: 1,
                               }}
                           >
                               <ListItemIcon sx={{ color: "#003366"}}>
                                   {item.icon}
                               </ListItemIcon>
                               <ListItemText
                                   primary={
                                       <Typography
                                           variant="subtitle1"
                                           sx={{color: "Black",  fontWeight: 'bold' }}
                                       >
                                           {item.title}
                                       </Typography>
                                   }
                               />
                           </ListItem>
                       ))}
                   </List>
               </Box>
           </Drawer>
       </Box>
   );
};


export default AdminSidebar;



