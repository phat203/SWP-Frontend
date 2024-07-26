import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  Create as CreateIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllMenuItem,
  updateJewelryPrice,
  instockItem,
} from "../../component/State/Menu/Action";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MenuTable = () => {
  const { menu } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);

  useEffect(() => {
    dispatch(getAllMenuItem({ jwt }));
  }, [dispatch, jwt]);

  useEffect(() => {
    setFilteredMenuItems(
      menu.menuItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, menu.menuItems]);

  const handleRefresh = () => {
    dispatch(updateJewelryPrice({ jwt }));
    toast.success("Jewelry prices updated successfully!");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleClickOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = () => {
    if (selectedItem) {
      dispatch(instockItem({ jewelryId: selectedItem.id, jwt }));
      toast.success("Item marked as out of stock!");
      handleClose();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm && filteredMenuItems.length === 0) {
      toast.info("No items match your search criteria.");
    }
  };

  return (
    <Box sx={{ padding: 3, minHeight: "100vh" }}>
      <Card sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
        <CardHeader
          title={"Menu"}
          action={
            <>
              <IconButton
                onClick={handleRefresh}
                aria-label="refresh"
                sx={{ marginRight: 2 }}
              >
                <RefreshIcon />
              </IconButton>
              <IconButton
                onClick={() => navigate("/manager/jewelry/add-menu")}
                aria-label="create"
              >
                <CreateIcon />
              </IconButton>
            </>
          }
          sx={{
            pt: 2,
            pb: 1,
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
            backgroundColor: "#0B4CBB",
            color: "#fff",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: 2,
            gap: 1,
          }}
        >
          <TextField
            id="search-input"
            label="Search by Name"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#0B4CBB",
                },
                "&:hover fieldset": {
                  borderColor: "#0B4CBB",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#0B4CBB",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#0B4CBB",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#0B4CBB",
              },
            }}
          />
          <IconButton
            aria-label="search"
            onClick={handleSearch}
            sx={{ color: "#0B4CBB" }}
          >
            <SearchIcon />
          </IconButton>
        </Box>
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 2, boxShadow: 3 }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#0B4CBB" }}>
                <TableCell align="left">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Image
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Jewelry Code
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Name
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Type
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Components
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Price
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Out Of Stock
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMenuItems.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                    "&:hover": { backgroundColor: "#e0e0e0" },
                    transition: "background-color 0.3s",
                  }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      src={row.images}
                      alt="Product Image"
                      style={{ width: 50, height: 50, borderRadius: 4 }}
                    />
                  </TableCell>
                  <TableCell align="center">{row.code}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">
                    {row.jewelryCategory.name}
                  </TableCell>
                  <TableCell align="right">
                    {row.components[0]?.name} with {row.components[1]?.name}
                  </TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleClickOpen(row)}>
                      <DoDisturbOnIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {searchTerm !== "" && filteredMenuItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No items match your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Dialog open={open} onClose={handleClose} sx={{ borderRadius: 2 }}>
        <DialogTitle>{"Confirm Out Of Stock"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to mark this item as out of stock?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Out Of Stock
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
};

export default MenuTable;
