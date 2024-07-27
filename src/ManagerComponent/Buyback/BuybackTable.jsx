import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBuyback } from "../../component/State/Buyback/Action";
import {
  Box,
  Card,
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
  CardHeader,
  Pagination,
} from "@mui/material";
import format from "date-fns/format";
import SearchIcon from "@mui/icons-material/Search";

export default function BuyBackTable() {
  const { buyback } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBuybacks, setFilteredBuybacks] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  window.scrollTo(9, 9);
  useEffect(() => {
    dispatch(getAllBuyback({ jwt }));
  }, [dispatch, jwt]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, buyback]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowNoResults(false);
  };

  const handleSearch = () => {
    const filtered = buyback?.buybacks.filter((buybackItem) =>
      buybackItem.customer.fullname
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredBuybacks(filtered);
    if (searchTerm && filtered.length === 0) {
      setShowNoResults(true);
    } else {
      setShowNoResults(false);
    }
  };

  const handleSearchClick = () => {
    handleSearch();
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = filteredBuybacks.slice(
    startIndex,
    startIndex + ordersPerPage
  );

  return (
    <Box sx={{ padding: 3, minHeight: "100vh" }}>
      <Card sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
        <CardHeader
          title={"BuyBacks"}
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#0B4CBB" }}>
                {["ID", "Customer", "Price", "Date"].map((header) => (
                  <TableCell key={header} align="center">
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      {header}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentOrders.length > 0 ? (
                currentOrders.map((buybackItem) => (
                  <TableRow
                    key={buybackItem.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                      "&:hover": { backgroundColor: "#e0e0e0" },
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: "bold", color: "black" }}
                    >
                      {buybackItem.id}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "black" }}>
                      {buybackItem.customer.fullname}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "black" }}>
                      {buybackItem.buybackPrice}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "black" }}>
                      {format(
                        new Date(buybackItem.transactionDate),
                        "MM/dd/yyyy HH:mm"
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No buybacks available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2, pb: 2 }}>
            <Pagination
              count={Math.ceil(filteredBuybacks.length / ordersPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </TableContainer>
      </Card>
    </Box>
  );
}
