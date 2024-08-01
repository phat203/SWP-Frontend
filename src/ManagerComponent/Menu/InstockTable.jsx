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
  Pagination,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateJewelryPrice,
  getOutOfStockItems,
  instockItem,
} from "../../component/State/Menu/Action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InstockTable = () => {
  const { menu } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [setShowNoItemAlert] = useState(false);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 12;

  useEffect(() => {
    dispatch(getOutOfStockItems({ jwt }));
  }, [dispatch, jwt]);

  useEffect(() => {
    setFilteredMenuItems(
      menu.outOfStock.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, menu.outOfStock]);

  const handleRefresh = () => {
    dispatch(updateJewelryPrice({ jwt }));
    window.location.reload();
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
      dispatch(instockItem({ jewelryId: selectedItem.id, jwt }))
        .then(() => {
          toast.success("Item added to stock successfully!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          console.error("Error adding item to stock", error);
        });
      handleClose();
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowNoItemAlert(false);
  };

  const handleSearch = () => {
    if (searchTerm && filteredMenuItems.length === 0) {
      setShowNoItemAlert(true);
    } else {
      setShowNoItemAlert(false);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate the items to display for the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredMenuItems.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  return (
    <Box sx={{ padding: 3, minHeight: "100vh" }}>
      <Card sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
        <CardHeader
          title={"OutStock"}
          action={
            <>
              <IconButton
                onClick={handleRefresh}
                aria-label="refresh"
                sx={{ marginRight: 2 }}
              >
                <RefreshIcon />
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
                    ADD
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentOrders.map((row) => (
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
                  <TableCell align="center">
                    {row.components
                      ? row.components
                          .map((component) => component.name)
                          .join(", ")
                      : "N/A"}
                  </TableCell>
                  <TableCell align="right">{row.price} USD</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      onClick={() => handleClickOpen(row)}
                      sx={{
                        backgroundColor: "#4caf50", // Custom background color
                        color: "#ffffff", // Text color
                        fontWeight: "bold", // Bold text
                        borderRadius: "8px", // Rounded corners
                        textTransform: "none", // Keep text case as is
                        padding: "8px 16px", // Custom padding
                        transition: "background-color 0.3s ease", // Smooth transition for hover
                        "&:hover": {
                          backgroundColor: "#388e3c", // Darker shade on hover
                        },
                      }}
                    >
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: 2,
          }}
        >
          <Pagination
            count={Math.ceil(filteredMenuItems.length / ordersPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Item to Stock"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to add this item back to stock?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Box>
  );
};

export default InstockTable;
