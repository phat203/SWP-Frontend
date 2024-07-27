import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Pagination,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  
  getAllCustomers,
} from "../../component/State/Customer/Action";
import UpdateCustomerForm from "./UpdateCustomerForm";
import SearchIcon from "@mui/icons-material/Search";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Customer = () => {
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [setShowNoResults] = useState(false);
  const ordersPerPage = 12;

  const { customers } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getAllCustomers(jwt));
  }, [dispatch, jwt]);

  const handleSearchClick = () => {
    handleSearch();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedCustomer(null);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowNoResults(false);
  };
  const handleUpdateClick = (customer) => {
    setSelectedCustomer(customer);
    setOpen(true);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to the first page on search
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.fullname.toLowerCase().includes(searchTerm)
  );

  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + ordersPerPage
  );

  return (
    <Box sx={{ padding: 3, minHeight: "100vh" }}>
      <Card sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
        <CardHeader
          title={"Customer"}
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
            label="Search by Customer Name"
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
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "#0B4CBB",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#0B4CBB",
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
          <IconButton aria-label="search" onClick={handleSearchClick}>
            <SearchIcon />
          </IconButton>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="customer table">
            <TableHead sx={{ backgroundColor: "#0B4CBB" }}>
              <TableRow>
                <TableCell
                  align="left"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  ID
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Full Name
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Phone Number
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Email
                </TableCell>
                <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Type
              </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Điểm Tích Luỹ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentCustomers.length > 0 ? (
                currentCustomers.map((customer, index) => (
                  <TableRow key={customer.id}>
                    <TableCell component="th" scope="row">
                      {startIndex + index + 1}
                    </TableCell>
                    <TableCell align="right">{customer.fullname}</TableCell>
                    <TableCell align="right">{customer.mobile}</TableCell>
                    <TableCell align="center">{customer.email}</TableCell>
                    <TableCell align="center">{customer.type}</TableCell>
                    <TableCell align="right">{customer.point}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No Customer available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2, pb: 2 }}>
            <Pagination
              count={Math.ceil(filteredCustomers.length / ordersPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </TableContainer>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateCustomerForm
            customer={selectedCustomer}
            onClose={handleClose}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Customer;
