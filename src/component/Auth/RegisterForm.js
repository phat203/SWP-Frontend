import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../State/Authentication/Action";

const initialValues = {
  fullname: "",
  username: "",
  password: "",
  gender: "",
  email: "",
  role: "",
};

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(registerUser({ userData: values, navigate }))
      .then(() => {
        // On successful registration, navigate to the login page or a success page
        navigate("/area/:title/:id"); // or navigate("/registration-success");
      })
      .catch((error) => {
        console.error("Registration failed", error);
        // Handle registration error here
      });
  };
  const validate = (values) => {
    const errors = {};

    if (!values.fullname) {
      errors.fullname = "Full Name is required";
    }

    if (!values.username) {
      errors.username = "Username is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    } else if (values.password.length > 15) {
      errors.password = "Password must not exceed 15 characters";
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password = "Password must contain at least one uppercase letter";
    }

    if (!values.email) {
      errors.email = "Email is required";
    }

    return errors;
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/5442446/pexels-photo-5442446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <img
            src="https://cdn.pnj.io/images/logo/pnj.com.vn.png"
            alt="Logo"
            style={{ width: "100px" }}
          />
        </div>
        <Typography
          variant="h5"
          className="text-center"
          style={{ color: "black" }}
        >
          Register
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={validate}
        >
          {({ isSubmitting, errors, touched, handleBlur }) => (
            <Form>
              <Field
                as={TextField}
                name="fullname"
                label="Full Name"
                fullWidth
                variant="outlined"
                margin="normal"
                onBlur={handleBlur}
                helperText={
                  touched.fullname && errors.fullname ? errors.fullname : ""
                }
                error={touched.fullname && Boolean(errors.fullname)}
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
              <Field
                as={TextField}
                name="username"
                label="Username"
                fullWidth
                variant="outlined"
                margin="normal"
                onBlur={handleBlur}
                helperText={
                  touched.username && errors.username ? errors.username : ""
                }
                error={touched.username && Boolean(errors.username)}
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
              <Field
                as={TextField}
                name="password"
                label="Password"
                fullWidth
                variant="outlined"
                margin="normal"
                type="password"
                onBlur={handleBlur}
                helperText={
                  touched.password && errors.password ? errors.password : ""
                }
                error={touched.password && Boolean(errors.password)}
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
              <Field
                as={Select}
                name="gender"
                fullWidth
                margin="normal"
                variant="outlined"
                displayEmpty
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
                }}
              >
                <MenuItem value="">
                  <em>Gender</em>
                </MenuItem>
                <MenuItem value={"Man"}>Man</MenuItem>
                <MenuItem value={"Woman"}>Woman</MenuItem>
              </Field>
              <Field
                as={TextField}
                name="email"
                label="Email"
                fullWidth
                variant="outlined"
                margin="normal"
                type="email"
                onBlur={handleBlur}
                helperText={touched.email && errors.email ? errors.email : ""}
                error={touched.email && Boolean(errors.email)}
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
              <Field
                as={Select}
                name="role"
                fullWidth
                margin="normal"
                variant="outlined"
                displayEmpty
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
                }}
              >
                <MenuItem value="">
                  <em>Role</em>
                </MenuItem>
                <MenuItem value={"ROLE_STAFF"}>Staff</MenuItem>
                <MenuItem value={"ROLE_MANAGER"}>Manager</MenuItem>
                <MenuItem value={"ROLE_JEWELRY_OWNER"}>Owner</MenuItem>
              </Field>
              <Button
                sx={{
                  mt: 2,
                  padding: "1rem",
                  background: "linear-gradient(to right, gray, yellow)",
                  color: "white",
                }}
                className="mt-5"
                fullWidth
                type="submit"
                variant="contained"
                disabled={isSubmitting}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3, color: "black" }}
        >
          If you already have an account,
          <Button
            size="small"
            onClick={() => navigate("/account/login")}
            sx={{ color: "blue" }}
          >
            Login
          </Button>
        </Typography>
      </div>
    </div>
  );
}
