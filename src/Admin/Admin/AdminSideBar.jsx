import React, { useState } from 'react';
import { Dashboard, Home, Group, Checklist, Logout } from '@mui/icons-material';
import { Drawer, Typography, useMediaQuery, Divider, IconButton, Box, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../component/State/Authentication/Action';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import BlockIcon from '@mui/icons-material/Block';
import logo from '../../assets/logo.png';
const menu = [
    { title: "Home", icon: <Home />, path: "/" },
    { title: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { title: "User", icon: <Group />, path: "/user" },
    { title: "Block", icon: <BlockIcon />, path: "/ban" },
    { title: "Logout", icon: <Logout sx={{ color: 'red' }} />, path: "/logout" },
];

const Logo = styled("img")({
    height: 300, 
    width: 300, 
    backgroundColor: "#003366",
    borderRadius: "100%",
    border: "5px solid #EEBF0D", 
  });
const AdminSidebar = () => {
    const isSmallScreen = useMediaQuery("(max-width:1080px)");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();

    const handleNavigate = (item) => {
        if (item.title === "Logout") {
            dispatch(logout());
            navigate("/");
        } else {
            navigate(`/admin/jewelry${item.path}`);
        }
        if (isSmallScreen) setDrawerOpen(false);
    };

    const handleLogoClick = () => {
        navigate("/admin/jewelry");
        if (isSmallScreen) setDrawerOpen(false);
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
                        backgroundColor: "#FFFFF",
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
                        {menu.map((item, i) => (
                            <ListItem
                                button
                                key={i}
                                onClick={() => handleNavigate(item)}
                                sx={{
                                    '&:hover': {
                                        backgroundColor:"#003366",
                                    },
                                    transition: 'all 0.3s',
                                    mb: 1,
                                }}
                            >
                                <ListItemIcon sx={{color: "#003366"}}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography
                                            variant="subtitle1"
                                            sx={{ fontWeight: 'bold',color: "#003366" }}
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
