import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Grid, Modal, TextField, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import { createUser } from "../../component/State/Authentication/Action";
import StaffTableA from "./StaffTableA";

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
  fullname: "",
  username: "",
  password: "",
  gender: "",
  email: "",
  role: "",
};

const User = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValue, setFormValue] = useState(initialValue);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    const startsWithSpace = (value) => /^\s/.test(value);

    tempErrors.fullname = !formValue.fullname
      ? "Full Name is required."
      : startsWithSpace(formValue.fullname)
      ? "Full Name cannot start with a space."
      : "";
    tempErrors.username = !formValue.username
      ? "Username is required."
      : startsWithSpace(formValue.username)
      ? "Username cannot start with a space."
      : "";

    // Password validation
    if (!formValue.password) {
      tempErrors.password = "Password is required.";
    } else if (startsWithSpace(formValue.password)) {
      tempErrors.password = "Password cannot start with a space.";
    } else if (formValue.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long.";
    } else if (formValue.password.length > 15) {
      tempErrors.password = "Password must not exceed 15 characters.";
    } else if (!/[A-Z]/.test(formValue.password)) {
      tempErrors.password =
        "Password must contain at least one uppercase letter.";
    } else if (!/\d/.test(formValue.password)) {
      tempErrors.password = "Password must contain at least one number.";
    } else {
      tempErrors.password = "";
    }

    tempErrors.email = !formValue.email
      ? "Email is not valid."
      : startsWithSpace(formValue.email)
      ? "Email cannot start with a space."
      : !/.+@.+\..+/.test(formValue.email)
      ? "Email is not valid."
      : "";
    tempErrors.gender = !formValue.gender
      ? "Gender is required."
      : startsWithSpace(formValue.gender)
      ? "Gender cannot start with a space."
      : "";
    tempErrors.role = !formValue.role
      ? "Role is required."
      : startsWithSpace(formValue.role)
      ? "Role cannot start with a space."
      : "";

    setErrors({ ...tempErrors });
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      console.log("submit ", formValue);
      setFormValue(initialValue);
      const reqdata = formValue;
      await dispatch(createUser(reqdata, jwt));
      handleClose(); // Đóng modal sau khi submit thành công
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(`${error.response.data.message}`);
      } else {
        toast.error("Fail. Please try again.");
      }
      console.error("error:", error);
    }
  };

  const handleFormChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: "#0B4CBB",
            color: "white",
            fontWeight: "bold",
            height: "40px",
            padding: "8px",
            "&:hover": {
              bgcolor: "darkorange",
            },
            "&:focus": {
              bgcolor: "black",
            },
          }}
        >
          Create Account
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <IconButton
              onClick={handleCloseDialog}
              sx={{ position: "absolute", top: 1, right: 1, color: 'red'}}
            >
              <CloseIcon />
            </IconButton>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name="fullname"
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    value={formValue.fullname}
                    onChange={handleFormChange}
                    error={!!errors.fullname}
                    helperText={errors.fullname}
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
                    name="username"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={formValue.username}
                    onChange={handleFormChange}
                    error={!!errors.username}
                    helperText={errors.username}
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
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={formValue.password}
                    onChange={handleFormChange}
                    error={!!errors.password}
                    helperText={errors.password}
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
                    name="gender"
                    label="Gender"
                    variant="outlined"
                    fullWidth
                    value={formValue.gender}
                    onChange={handleFormChange}
                    error={!!errors.gender}
                    helperText={errors.gender}
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
                    name="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    value={formValue.email}
                    onChange={handleFormChange}
                    error={!!errors.email}
                    helperText={errors.email}
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
                    name="role"
                    label="Role"
                    variant="outlined"
                    fullWidth
                    value={formValue.role}
                    onChange={handleFormChange}
                    error={!!errors.role}
                    helperText={errors.role}
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
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: "#0B4CBB",
                      color: "white",
                      fontWeight: "bold",
                      height: "40px",
                      padding: "8px",
                      "&:hover": {
                        bgcolor: "darkorange",
                      },
                      "&:focus": {
                        bgcolor: "black",
                      },
                    }}
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
        <StaffTableA />
        <ToastContainer />
      </div>
    </>
  );
};

export default User;
