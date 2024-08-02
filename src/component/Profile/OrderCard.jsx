import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateOrderStatus } from "../State/AreaOrder/Action";
import { getUsersOrders } from "../State/Order/Action";

export default function OrderCard() {
  const { orders } = useSelector((store) => store.order);
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
    const options = {
      year: "numeric",
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState(""); // State for error message
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
  const handleSearchByDate = () => {
    // Validate date range
    if (new Date(startDate) > new Date(endDate)) {
      toast.error("Start date cannot be later than end date.");
      return;
    } else {
      setError("");
    }
    // Filter orders based on date range
    const filtered = orders
      ?.filter((order) => {
        const orderDate = new Date(order.createdAt).toLocaleDateString();
        return (
          (!startDate || new Date(order.createdAt) >= new Date(startDate)) &&
          (!endDate || new Date(order.createdAt) <= new Date(endDate))
        );
      })
      .reverse();
    setFilteredOrders(filtered);
    setCurrentPage(1); // Reset to first page
  };

  const handleUpdateOrder = (orderStatus) => {
    if (selectedOrderId && orderStatus) {
      dispatch(
        updateOrderStatus({ orderId: selectedOrderId, orderStatus, jwt })
      )
        .then(() => {
          dispatch(getUsersOrders(jwt));
          toast.success("Order status updated successfully.", {
            autoClose: 500,
          });
        })
        .catch((error) => {
          console.error("Failed to update order status", error);
          toast.error("Failed to update order status."); // Optional: error message
        });
      handleClose();
    } else {
      toast.error("Order ID or status is missing.");
    }
  };

  useEffect(() => {
    if (orders) {
      handleSearch();
    }
  }, [orders, filterStatus, searchTerm, startDate, endDate, currentPage]);

  const handleSearch = () => {
    // Validate date range
    if (new Date(startDate) > new Date(endDate)) {
      toast.error("Start date cannot be later than end date.");
      return;
    } else {
      setError("");
    }
    const filtered = orders
      ?.filter((order) => {
        const isStatusMatch =
          filterStatus === "ALL" || order.orderStatus === filterStatus;
        const isNameMatch = order.customer.fullname
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const orderDate = new Date(order.createdAt).toLocaleDateString();
        const isDateInRange =
          (!startDate || new Date(order.createdAt) >= new Date(startDate)) &&
          (!endDate || new Date(order.createdAt) <= new Date(endDate));

        return isStatusMatch && isNameMatch && isDateInRange;
      })
      .reverse();
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
  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + ordersPerPage
  );

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
            <FormControlLabel
              value="PENDING"
              control={<Radio />}
              label="PENDING"
            />
            <FormControlLabel
              value="COMPLETED"
              control={<Radio />}
              label="COMPLETED"
            />
          </RadioGroup>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <TextField
              id="start-date-input"
              label="Start Date"
              type="date"
              variant="outlined"
              size="small"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
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
            <TextField
              id="end-date-input"
              label="End Date"
              type="date"
              variant="outlined"
              size="small"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearchByDate}
              sx={{
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
              Search
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <TextField
              id="search-input"
              label="Search by Name"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              InputLabelProps={{ shrink: true }}
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
        </Box>

        {/* Show error message if date range is invalid */}
        {error && (
          <Snackbar
            open={Boolean(error)}
            autoHideDuration={6000}
            onClose={() => setError("")}
          >
            <Alert onClose={() => setError("")} severity="error">
              {error}
            </Alert>
          </Snackbar>
        )}

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
                      "&:hover": {
                        backgroundColor: "#e0e0e0",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => handleRowClick(order)}
                  >
                    <TableCell component="th" scope="row">
                      {order.id}
                    </TableCell>
                    <TableCell align="center">
                      {order.customer.fullname}
                    </TableCell>
                    <TableCell align="center">{order.totalPrice}</TableCell>
                    <TableCell align="center">{order.areaName}</TableCell>
                    <TableCell align="center">
                      {order.items[0].discountPercentage}%
                    </TableCell>
                    <TableCell align="center">
                      {formatDate(order.createdAt)}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color:
                          order.orderStatus === "PENDING" ? "red" : "green",
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
            <Dialog
              open={openDialog}
              onClose={closeDialog}
              fullWidth
              maxWidth="md"
            >
              <DialogTitle>Order Details</DialogTitle>
              <DialogContent>
                {selectedOrder && (
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
                            <TableCell align="center">
                              {item.jewelry.name}
                            </TableCell>
                            <TableCell align="center">
                              {item.quantity}
                            </TableCell>
                            <TableCell align="center">
                              {item.totalPrice}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
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
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}>
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
        open={Boolean(anchorEl)}
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
            onClick={() => {
              // Kiểm tra và xử lý status.value tại đây
              console.log("Selected status:", status.value);
              handleUpdateOrder(status.value);
            }}
          >
            {status.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
