import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  TextField,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getALLsOrders } from "../../component/State/Order/Action";

export default function OrdersTable({ filter }) {
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const ordersPerPage = 12;

  const [orderItems, setOrderItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getALLsOrders(jwt));
  }, [dispatch, jwt]);

  useEffect(() => {
    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      const isWithinDateRange =
        (!startDate || orderDate >= new Date(startDate)) &&
        (!endDate || orderDate <= new Date(endDate));

      return (
        (filterStatus === "ALL" ||
          order.orderStatus.toUpperCase() === filterStatus) &&
        (order.customer.fullname
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          order.id.toString().toLowerCase().includes(searchTerm.toLowerCase())) &&
        isWithinDateRange
      );
    });

    setSearchResults(filteredOrders);
    setCurrentPage(1);
  }, [orders, filterStatus, searchTerm, startDate, endDate]);

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setOrderItems(order.items);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
    setOrderItems([]);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = searchResults.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <Box sx={{ padding: 3, minHeight: "100vh" }}>
      <Card sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
        <CardHeader
          title={"All Orders"}
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
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
            marginTop: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <RadioGroup
              row
              aria-label="filter-status"
              name="filter-status"
              value={filterStatus}
              onChange={handleFilterChange}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <FormControlLabel value="ALL" control={<Radio />} label="All" />
              <FormControlLabel value="PENDING" control={<Radio />} label="Pending" />
              <FormControlLabel value="COMPLETED" control={<Radio />} label="Completed" />
            </RadioGroup>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              id="search-input"
              label="Search"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "gray",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "gray",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "gray",
                },
              }}
            />
            <IconButton aria-label="search" onClick={() => console.log("Search clicked")}>
              <SearchIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              id="start-date"
              label="Start Date"
              type="date"
              variant="outlined"
              size="small"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ marginRight: 2 }}
            />
            <TextField
              id="end-date"
              label="End Date"
              type="date"
              variant="outlined"
              size="small"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#0B4CBB" }}>
                <TableCell>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "white" }}>
                    ID
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "white" }}>
                    Customer
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "white" }}>
                    Price
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "white" }}>
                    Stall
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "white" }}>
                    Discount
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "white" }}>
                    Creation Date
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "white" }}>
                    Status
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                      No orders found.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                currentOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                      "&:hover": { backgroundColor: "#e0e0e0" },
                      cursor: "pointer",
                    }}
                    onClick={() => handleRowClick(order)}
                  >
                    <TableCell component="th" scope="row" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                      {order.id}
                    </TableCell>
                    <TableCell align="center">{order.customer.fullname}</TableCell>
                    <TableCell align="center">{order.totalPrice}</TableCell>
                    <TableCell align="center">{order.areaName}</TableCell>
                    <TableCell align="center">{order.items[0].discountPercentage}%</TableCell>
                    <TableCell align="center">{formatDate(order.createdAt)}</TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          color: order.orderStatus === "COMPLETED" ? "green" : "red",
                        }}
                      >
                        {order.orderStatus}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, pb: 2 }}>
          <Pagination
            count={Math.ceil(searchResults.length / ordersPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Card>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Order Items</DialogTitle>
        <DialogContent>
          {orderItems.length === 0 ? (
            <Typography variant="body1" sx={{ fontStyle: "italic" }}>
              No items found for this order.
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        Item ID
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        Jewelry
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        Quantity
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        Price
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderItems.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{
                        "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                        "&:hover": { backgroundColor: "#e0e0e0" },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {item.jewelry.code}
                      </TableCell>
                      <TableCell align="center">{item.jewelry.name}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="center">{item.jewelry.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
