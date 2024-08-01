import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
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
  Typography,
  TextField,
  InputAdornment,
  Pagination, // Import Pagination
} from "@mui/material";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useSelector, useDispatch } from "react-redux";
import { getAllComponent } from "../../component/State/Components/Action";
import UpdateForm from "./UpdateForm";
import CreateIngredientsForm from "./CreateIngredientsForm";
import SearchIcon from '@mui/icons-material/Search';
import UpgradeIcon from "@mui/icons-material/Upgrade";
import CloseIcon from '@mui/icons-material/Close';  // Import CloseIcon

const IngredientTable = () => {
  const [open, setOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDialog, setShowDialog] = useState(false);  // State for dialog visibility
  const { components } = useSelector((state) => state.component);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [showNoComponentAlert, setShowNoComponentAlert] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 12;

  useEffect(() => {
    dispatch(getAllComponent({ jwt }));
  }, [dispatch, jwt]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedComponent(null);
  };

  const handleUpdateClick = (component) => {
    setSelectedComponent(component);
    setOpen(true);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    if (searchTerm.trim() === "") {
      setShowNoComponentAlert(false);
    } else {
      const found = components.some(
        (component) => component.name.toLowerCase().includes(searchTerm)
      );
      setShowNoComponentAlert(!found);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredComponents = components.filter((component) =>
    component.name.toLowerCase().includes(searchTerm)
  );

  const paginatedComponents = filteredComponents.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  return (
    <Box sx={{ padding: 3, minHeight: "100vh" }}>
      <Card sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="create">
              <CreateIcon />
            </IconButton>
          }
          title={"Ingredients"}
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 2, marginTop: 2 }}>
          <TextField
            id="search-input"
            label="Search by Name"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="ingredient table" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#0B4CBB" }}>
                <TableCell align="left">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    ID
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Name
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Price
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Price BuyBack
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedComponents.map((item, index) => (
                <TableRow
                  key={item.id}
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                    "&:hover": { backgroundColor: "#e0e0e0" },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {(currentPage - 1) * ordersPerPage + index + 1}
                  </TableCell>
                  <TableCell align="left">{item.name}</TableCell>
                  <TableCell align="left">{item.price}</TableCell>
                  <TableCell align="left">{item.pricebuyback}</TableCell>
                  <TableCell align="left">
                    <IconButton
                      onClick={() => handleUpdateClick(item)}
                      aria-label="update"
                      sx={{ color: "red", width: 60, height: 60 }} // Adjust the width and height to make the button larger
                    >
                      <ArrowCircleUpIcon sx={{color: "green" , fontSize: 30 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {searchTerm !== "" && filteredComponents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No ingredients found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2, pb: 2 }}>
            <Pagination
              count={Math.ceil(filteredComponents.length / ordersPerPage)}
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
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "none",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon sx={{ color: 'red' }}  />
          </IconButton>
          {selectedComponent ? (
            <UpdateForm component={selectedComponent} onClose={handleClose} />
          ) : (
            <CreateIngredientsForm onClose={handleClose} />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default IngredientTable;
