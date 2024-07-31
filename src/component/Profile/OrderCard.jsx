import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  MenuItem,
  Menu,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  IconButton,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus } from "../State/AreaOrder/Action";
import { getUsersOrders } from "../State/Order/Action";

export default function OrderCard() {
  const { order } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const orderStatus = [
    { label: "PENDING", value: "PENDING" },
    { label: "COMPLETED", value: "COMPLETED" },
  ];

  useEffect(() => {
    dispatch(getUsersOrders(jwt));
  }, [dispatch, jwt]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', day: '2-digit',month: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const ordersPerPage = 10;
  const open = Boolean(anchorEl);

  const handleClick = (event, orderId) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const handleUpdateOrder = (orderstatus) => {
    dispatch(updateOrderStatus({ orderId: selectedOrderId, orderstatus, jwt }))
      .then(() => {
        dispatch(getUsersOrders(jwt));
      })
      .catch((error) => {
        console.error("Failed to update order status", error);
      });
    handleClose();
  };

  useEffect(() => {
    if (order.orders) {
      handleSearch();
    }
  }, [order.orders, filterStatus, searchTerm, currentPage]);

  const handleSearch = () => {
    const filtered = order.orders?.filter(
      (order) =>
        (filterStatus === "ALL" || order.orderStatus === filterStatus) &&
        order.customer.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    ).reverse();
    setFilteredOrders(filtered);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowClick = (order) => {
    if (order.id !== selectedOrderId) {
      setSelectedOrder(order);
      setOpenDialog(true);
    }
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

  return (
    <Box sx={{ padding: 3, minHeight: "100vh" }}>
      <Card sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
        <CardHeader
          title={"All Orders"}
          sx={{
            pt: 2,
            pb: 2,
            textAlign: "center",
            fontSize: "1.75rem",
            fontWeight: "bold",
            backgroundColor: "#0B4CBB",
            color: "#fff",
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <RadioGroup
            row
            aria-label="filter-status"
            name="filter-status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <FormControlLabel value="ALL" control={<Radio />} label="All" />
            <FormControlLabel value="PENDING" control={<Radio />} label="Pending" />
            <FormControlLabel value="COMPLETED" control={<Radio />} label="Completed" />
          </RadioGroup>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 3, marginRight: 2 }}>
          <TextField
            id="search-input"
            label="Search by Name"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
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
          <IconButton aria-label="search" onClick={handleSearch} sx={{ color: "#0B4CBB" }}>
            <SearchIcon />
          </IconButton>
        </Box>
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#0B4CBB" }}>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    ID
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Customer
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Price
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Stall
                  </Typography>
                </TableCell>

                <TableCell align="center">
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  Discount
                </Typography>
              </TableCell>

              <TableCell align="center">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                  Creation Date
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Status
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Update
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                      "&:hover": { backgroundColor: "#e0e0e0", cursor: "pointer" },
                    }}
                    onClick={() => handleRowClick(order)}
                  >
                    <TableCell component="th" scope="row">
                      {order.id}
                    </TableCell>
                    <TableCell align="center">{order.customer.fullname}</TableCell>
                    <TableCell align="center">{order.totalAmount}</TableCell>
                    <TableCell align="center">{order.areaName}</TableCell>
                    <TableCell align="center">{order.items[0].discountPercentage}%</TableCell>
                    <TableCell align="center">{formatDate(order.createdAt)}</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: order.orderStatus === "PENDING" ? "red" : "green",
                        fontWeight: "bold",
                      }}
                    >
                      {order.orderStatus}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => handleClick(e, order.id)}
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {openDialog && selectedOrder && (
            <Dialog open={openDialog} onClose={closeDialog} fullWidth maxWidth="md">
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Code</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                      <TableCell align="center">Total Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.items.map((item) => (
                      <TableRow key={item.id}>
                     <TableCell>{item.jewelry.code}</TableCell>
                        <TableCell align="center">{item.jewelry.name}</TableCell>
                        <TableCell align="center">{item.quantity}</TableCell>
                        <TableCell align="center">{item.totalPrice}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
          )}
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
          <Pagination
            count={Math.ceil(filteredOrders.length / ordersPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Card>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "20ch",
          },
        }}
      >
        {orderStatus.map((status) => (
          <MenuItem
            key={status.value}
            selected={status.value === filterStatus}
            onClick={() => handleUpdateOrder(status.value)}
          >
            {status.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
