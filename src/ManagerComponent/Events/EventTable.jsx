import { Delete } from "@mui/icons-material";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import format from "date-fns/format";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteCoupon,
  getCoupons,
  updateCoupon,
} from "../../component/State/Event/Action";

const EventTable = () => {
  const dispatch = useDispatch();
  const coupon = useSelector((state) => state.coupon);
  const jwt = localStorage.getItem("jwt");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);
  const [couponToUpdate, setCouponToUpdate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [updatedName, setUpdatedName] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  const [updatedValidFrom, setUpdatedValidFrom] = useState("");
  const [updatedValidUntil, setUpdatedValidUntil] = useState("");
  const [updatedCode, setUpdatedCode] = useState("");
  const [updatedDiscountPercentage, setUpdatedDiscountPercentage] =
    useState("");

  useEffect(() => {
    dispatch(getCoupons(jwt));
  }, [dispatch, jwt]);

  const handleDeleteClick = (couponId) => {
    setOpenDeleteDialog(true);
    setCouponToDelete(couponId);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteCoupon(couponToDelete, jwt))
      .then(() => {
        toast.success("Delete Event Success", { autoClose: 500 });
        setOpenDeleteDialog(false);
      })
      .catch((error) => {
        toast.error("Delete Event Failed", { autoClose: 500 });
        setOpenDeleteDialog(false);
      });
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setCouponToDelete(null);
  };

  const handleUpdateClick = (coupon) => {
    setCouponToUpdate(coupon);
    setUpdatedName(coupon.name);
    setUpdatedImage(coupon.images);
    setUpdatedValidFrom(format(new Date(coupon.validFrom), "yyyy-MM-ddTHH:mm"));
    setUpdatedValidUntil(
      format(new Date(coupon.validUntil), "yyyy-MM-ddTHH:mm")
    );
    setUpdatedCode(coupon.code);
    setUpdatedDiscountPercentage(coupon.discountPercentage);
    setOpenUpdateDialog(true);
  };

  const handleUpdateConfirm = () => {
    const isValidDate = (dateString) => {
      // Regular expression to check if the date is in YYYY-MM-DD format
      const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
      return regex.test(dateString);
    };
    // Check for empty fields
    if (!updatedName) {
      toast.error("Name is required", { autoClose: 1000 });
      return;
    }
    if (!updatedImage) {
      toast.error("Image URL is required", { autoClose: 1000 });
      return;
    }
    if (!updatedCode) {
      toast.error("Code is required", { autoClose: 1000 });
      return;
    }
    if (!updatedDiscountPercentage) {
      toast.error("Discount percentage cannot be empty", { autoClose: 1000 });
      return;
    }
    
    if (isNaN(updatedDiscountPercentage)) {
      toast.error("Discount percentage must be a number", { autoClose: 1000 });
      return;
    }
    
    if (updatedDiscountPercentage <= 0) {
      toast.error("Discount percentage must be a positive number", { autoClose: 1000 });
      return;
    }
    if (!updatedValidFrom) {
      toast.error("Valid from date is required", { autoClose: 1000 });
      return;
    }
    
    if (!updatedValidUntil) {
      toast.error("Valid until date is required", { autoClose: 1000 });
      return;
    }
    
    if (!isValidDate(updatedValidFrom)) {
      toast.error("Valid from date format is invalid", { autoClose: 1000 });
      return;
    }
    
    if (!isValidDate(updatedValidUntil)) {
      toast.error("Valid until date format is invalid", { autoClose: 1000 });
      return;
    }
    
    if (new Date(updatedValidFrom) >= new Date(updatedValidUntil)) {
      toast.error("Valid from date must be before valid until date", { autoClose: 1000 });
      return;
    }

    // Check for leading spaces
    if (updatedName.trim() !== updatedName) {
      toast.error("Name should not have leading spaces", { autoClose: 1000 });
      return;
    }
    if (updatedImage.trim() !== updatedImage) {
      toast.error("Image URL should not have leading spaces", { autoClose: 1000 });
      return;
    }
    if (updatedCode.trim() !== updatedCode) {
      toast.error("Code should not have leading spaces", { autoClose: 1000 });
      return;
    }
    
    if (updatedCode !== updatedCode.toUpperCase()) {
      toast.error("Code must be in uppercase", { autoClose: 1000 });
      return;
    }
    
    if (/\s/.test(updatedCode)) {
      toast.error("Code should not contain spaces", { autoClose: 1000 });
      return;
    }
    const couponData = {
      name: updatedName,
      images: updatedImage,
      validFrom: new Date(updatedValidFrom).toISOString(),
      validUntil: new Date(updatedValidUntil).toISOString(),
      code: updatedCode,
      discountPercentage: updatedDiscountPercentage,
    };
    dispatch(updateCoupon(couponToUpdate.id, couponData, jwt))
      .then(() => {
        toast.success("Update Event Success", { autoClose: 500 });
        setOpenUpdateDialog(false);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toast.error(`${error.response.data}`);
        } else {
        toast.error("Update failed", { autoClose: 500 });
        setOpenUpdateDialog(false);
      }
      });
  };

  const handleUpdateCancel = () => {
    setOpenUpdateDialog(false);
    setCouponToUpdate(null);
  };

  const filteredEvents = coupon.coupons.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
      <CardHeader
        title={"Events"}
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
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <TextField
          label="Search by Event Name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
            mb: 2,
            mx: 5,
            width: "100%",
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

      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#0B4CBB" }}>
            <TableCell>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Image
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Time Start
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Time End
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Giftcode
              </Typography>
            </TableCell>
            <TableCell>
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
                Actions
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Delete
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedEvents.length > 0 ? (
            paginatedEvents.map((event, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                  "&:hover": { backgroundColor: "#e0e0e0" },
                }}
              >
                <TableCell>{event.name}</TableCell>
                <TableCell>
                  {event.images && (
                    <img
                      src={event.images}
                      alt="Event"
                      style={{
                        width: "100px",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>{event.code}</TableCell>
                <TableCell>{event.discountPercentage}%</TableCell>
                <TableCell>
                  {format(new Date(event.validFrom), "dd/MM/yyyy HH:mm")}
                </TableCell>
                <TableCell>
                  {format(new Date(event.validUntil), "dd/MM/yyyy HH:mm")}
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleUpdateClick(event)}>
                  <ArrowCircleUpIcon sx={{ color: "green",fontSize: 30  }} />
                  </IconButton>
                  </TableCell>
                  <TableCell>
                  <IconButton onClick={() => handleDeleteClick(event.id)}>
                  <Delete sx={{ color: "red",fontSize: 30  }}/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No events found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <Pagination
          count={Math.ceil(filteredEvents.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="primary"
            autoFocus
            sx={{ color: "red" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Dialog */}
      <Dialog
        open={openUpdateDialog}
        onClose={handleUpdateCancel}
        aria-labelledby="update-dialog-title"
      >
        <DialogTitle id="update-dialog-title">Update Event</DialogTitle>
        <DialogContent>
          <DialogContentText>Update the event details below:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Image URL"
            fullWidth
            value={updatedImage}
            onChange={(e) => setUpdatedImage(e.target.value)}
          />
          <TextField
            margin="dense"
            label="GIFT_CODE"
            fullWidth
            value={updatedCode}
            onChange={(e) => setUpdatedCode(e.target.value)}
          />
          <TextField
            margin="dense"
            label="DISCOUNT RATE"
            fullWidth
            value={updatedDiscountPercentage}
            onChange={(e) => setUpdatedDiscountPercentage(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Start Date and Time"
            type="datetime-local"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={updatedValidFrom}
            onChange={(e) => setUpdatedValidFrom(e.target.value)}
          />
          <TextField
            margin="dense"
            label="End Date and Time"
            type="datetime-local"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={updatedValidUntil}
            onChange={(e) => setUpdatedValidUntil(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateCancel} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdateConfirm}
            color="primary"
            autoFocus
            sx={{ color: "green" }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default EventTable;
