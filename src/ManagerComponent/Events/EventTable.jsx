import { Delete, Edit } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  CardHeader,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Box,
  Alert,
  Pagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoupons,
  deleteCoupon,
  updateCoupon,
} from "../../component/State/Event/Action";
import format from "date-fns/format";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";

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
    dispatch(deleteCoupon(couponToDelete, jwt));
    setOpenDeleteDialog(false);
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
    const couponData = {
      name: updatedName,
      images: updatedImage,
      validFrom: new Date(updatedValidFrom).toISOString(),
      validUntil: new Date(updatedValidUntil).toISOString(),
      code: updatedCode,
      discountPercentage: updatedDiscountPercentage,
    };
    dispatch(updateCoupon(couponToUpdate.id, couponData, jwt));
    toast.success("Update Event Success", {
      autoClose: 500,
    });
    setOpenUpdateDialog(false);
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
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(event.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No events available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, pb: 2 }}>
        <Pagination
          count={Math.ceil(filteredEvents.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {/* Update Dialog with Box */}
      <Dialog
        open={openUpdateDialog}
        onClose={handleUpdateCancel}
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <Box
          sx={{
            position: "relative",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <DialogTitle sx={{ mb: 2 }}>Update Event</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              value={updatedImage}
              onChange={(e) => setUpdatedImage(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Code"
              variant="outlined"
              fullWidth
              value={updatedCode}
              onChange={(e) => setUpdatedCode(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Discount Percentage"
              type="number"
              variant="outlined"
              fullWidth
              value={updatedDiscountPercentage}
              onChange={(e) => setUpdatedDiscountPercentage(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Valid From"
              type="datetime-local"
              variant="outlined"
              fullWidth
              value={updatedValidFrom}
              onChange={(e) => setUpdatedValidFrom(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Valid Until"
              type="datetime-local"
              variant="outlined"
              fullWidth
              value={updatedValidUntil}
              onChange={(e) => setUpdatedValidUntil(e.target.value)}
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdateCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdateConfirm} color="primary">
              Update
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteCancel}
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default EventTable;
