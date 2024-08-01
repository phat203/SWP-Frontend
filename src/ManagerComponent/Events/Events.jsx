import { Box, Button, Grid, Modal, TextField, IconButton } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { createCoupon } from "../../component/State/Event/Action";
import EventTable from "./EventTable";
import CloseIcon from "@mui/icons-material/Close"; // Import the CloseIcon

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

const initialValue = {
  images: "",
  name: "",
  code: "",
  discountPercentage: "",
  validFrom: null,
  validUntil: null,
};

export const Events = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValue, setFormValue] = useState(initialValue);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.images =
      formValue.images && formValue.images.trimStart() === formValue.images
        ? ""
        : "Image URL is required and should not start with a space.";

    tempErrors.name =
      formValue.name && formValue.name.trimStart() === formValue.name
        ? ""
        : "Name is required and should not start with a space.";

    tempErrors.code =
      formValue.code && formValue.code.trimStart() === formValue.code
        ? ""
        : "Code is required and should not start with a space.";

    tempErrors.discountPercentage =
      formValue.discountPercentage &&
      formValue.discountPercentage.toString().trimStart() ===
        formValue.discountPercentage.toString()
        ? ""
        : "Discount Percentage is required and should not start with a space.";

    tempErrors.validFrom = formValue.validFrom
      ? ""
      : "Valid From date is required.";
    tempErrors.validUntil = formValue.validUntil
      ? ""
      : "Valid Until date is required.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        console.log("submit ", formValue);
        await dispatch(createCoupon(formValue, jwt));
        setFormValue(initialValue);
        toast.success("Coupon created successfully!");
        handleClose();
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(`${error.response.data.message}`);
        } else {
          toast.error("Duplicate name. Please try again.");
        }
        console.error("error:", error);
      }
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  // Handles date changes and validates dates
  const handleDateChange = (newValue, field) => {
    setFormValue((prev) => ({ ...prev, [field]: newValue }));
    validateDates(newValue, field);
  };

  // Validates start and end dates
  const validateDates = (newValue, field) => {
    if (field === "validFrom" && newValue > formValue.validUntil) {
      setErrors((prev) => ({
        ...prev,
        validFrom: "Start date must be before end date.",
      }));
    } else if (field === "validUntil" && newValue < formValue.validFrom) {
      setErrors((prev) => ({
        ...prev,
        validUntil: "End date must be after start date.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="px-4">
        <div className="p-5">
          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: "#0B4CBB",
              color: "white",
              fontWeight: "bold",
              height: "40px", // Adjust height as needed
              padding: "8px",
              "&:hover": {
                bgcolor: "darkorange",
              },
              "&:focus": {
                bgcolor: "black",
              },
            }}
          >
            Create New Event
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} textAlign="right">
                    <IconButton onClick={handleCloseDialog}>
                      <CloseIcon sx={{ color: "red" }} />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="images"
                      label="Image URL"
                      variant="outlined"
                      fullWidth
                      value={formValue.images}
                      onChange={handleFormChange}
                      onBlur={() => validateForm("images")}
                      error={!!errors.images}
                      helperText={errors.images}
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
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      label="Name"
                      variant="outlined"
                      fullWidth
                      value={formValue.name}
                      onChange={handleFormChange}
                      onBlur={() => validateForm("name")}
                      error={!!errors.name}
                      helperText={errors.name}
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
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="code"
                      label="GIFT_CODE"
                      variant="outlined"
                      fullWidth
                      value={formValue.code}
                      onChange={handleFormChange}
                      onBlur={() => validateForm("code")}
                      error={!!errors.code}
                      helperText={errors.code}
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
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="discountPercentage"
                      label="DISCOUNT RATE"
                      variant="outlined"
                      fullWidth
                      value={formValue.discountPercentage}
                      onChange={handleFormChange}
                      onBlur={() => validateForm("discountPercentage")}
                      error={!!errors.discountPercentage}
                      helperText={errors.discountPercentage}
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
                  </Grid>
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        label="Start Date and Time"
                        value={formValue.validFrom}
                        onChange={(newValue) =>
                          handleDateChange(newValue, "validFrom")
                        }
                        inputFormat="MM/DD/YYYY hh:mm a"
                        className="w-full"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            error={!!errors.validFrom}
                            helperText={errors.validFrom}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        label="End Date and Time"
                        value={formValue.validUntil}
                        onChange={(newValue) =>
                          handleDateChange(newValue, "validUntil")
                        }
                        inputFormat="MM/DD/YYYY hh:mm a"
                        className="w-full"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            error={!!errors.validUntil}
                            helperText={errors.validUntil}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        bgcolor: "#0B4CBB",
                        color: "white",
                        fontWeight: "bold",
                        "&:hover": {
                          bgcolor: "darkorange",
                        },
                        "&:focus": {
                          bgcolor: "black",
                        },
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Modal>
        </div>
        <div>
          <EventTable />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Events;
