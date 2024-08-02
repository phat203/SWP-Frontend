import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup"; // Import Yup for validation
import logo from "../../assets/logo.png";
import { loginUser } from "../State/Authentication/Action";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string()
    .matches(/^[^\s].*$/, 'The username cannot start with a space')
    .matches(/^[^\s].*[^\s]$/, 'The username cannot have leading or trailing spaces')
    .required('Username is required'),
  password: Yup.string()
    .matches(/^[^\s].*$/, 'The password cannot start with a space')
    .required('Password is required')
});

const LoginForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(loginUser({ userData: values, navigate }))
      .then(() => {
        toast.success("Login successful!");
        // Optionally, redirect to a different page after a successful login
        // navigate("/some-page");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(`${error.response.data.message}`, {
            autoClose: 500,
          });
        } else {
          toast.error("Login Fail. Please try again.", {
            autoClose: 500,
          });
        }
        console.error("error:", error);
      });
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
          padding: "1rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img src={logo} alt="Logo" style={{ width: "100px" }} />
        </div>
        <Typography
          variant="h5"
          className="text-center"
          style={{ color: "black" }}
        >
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                name="username"
                label="Username"
                fullWidth
                variant="outlined"
                margin="normal"
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
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
                type="password"
                fullWidth
                variant="outlined"
                margin="normal"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
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
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3, color: "black" }}
        >
          
          {/* <Button size="big" onClick={() => navigate("/register")} sx={{ color: '' }}>
                        Register
                    </Button> */}
        </Typography>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginForm;