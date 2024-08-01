import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid"; // Ensure you have the correct import path
import * as Yup from "yup";
import { uploadImageToCloudinary } from "../../ManagerComponent/util/UploadToCloudinary"; // Import your image upload utility function
import { Navbar } from "../Navbar/Navbar";
import { createBuybackOut } from "../State/Buyback/Action";
import { calculateBuybackPriceOut } from "../State/Valuation/Action";
const Buy = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const { valuation } = useSelector((store) => store); // Lấy giá trị valuation từ Redux store
  const [Name, setName] = useState("");
  const [type, setType] = useState("");
  const [goldWeight, setGoldWeight] = useState("");
  const [diamondWeight, setDiamondWeight] = useState("");
  const [components, setComponents] = useState([]);
  const [images, setImages] = useState([]);
  const [buybackPrice, setBuybackPrice] = useState(null);
  const jwt = localStorage.getItem("jwt");

  const [isCustomerInfoModalOpen, setIsCustomerInfoModalOpen] = useState(false); // State for managing customer info modal open state
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false); // State for managing code modal open state
  const [code, setCode] = useState(""); // State for the code

  const handleOpenCustomerInfoModal = () => setIsCustomerInfoModalOpen(true);
  const handleCloseCustomerInfoModal = () => setIsCustomerInfoModalOpen(false);

  const handleOpenCodeModal = () => setIsCodeModalOpen(true);
  const handleCloseCodeModal = () => setIsCodeModalOpen(false);

  const initialValues = { fullname: "", mobile: "", email: "" };
  const CustomerSchema = Yup.object().shape({
    fullname: Yup.string()
      .required("Full name is required")
      .matches(/^[^\s].*[^\s]$/, "Full name cannot have spaces"),
    mobile: Yup.string()
      .required("Mobile is required")
      .matches(/^[^\s].*[^\s]$/, "Mobile cannot have spaces")
      .length(10, "Mobile must be exactly 10 characters")
      .matches(/^\d+$/, "Mobile must be a number"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .matches(/^[^\s].*[^\s]$/, "Email cannot have spaces"),
  });

  const handleCalculateBuybackPrice = async () => {
    dispatch(
      calculateBuybackPriceOut(goldWeight, diamondWeight, components, jwt)
    );
  };

  const handleSetBuybackPrice = () => {
    if (valuation.totalPrice !== undefined) {
      setBuybackPrice(valuation.totalPrice);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setImages([]); // Reset images array

    for (const file of files) {
      const url = await uploadImageToCloudinary(file);
      setImages((prevImages) => [...prevImages, { url, id: uuidv4() }]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      Name,
      type,
      goldWeight,
      diamondWeight,
      components: components.filter(Boolean),
      images: images.map((image) => image.url),
    };
    try {
      console.log(formData);

      await handleCalculateBuybackPrice();
      handleSetBuybackPrice();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(`${error.response.data.message}`);
      } else {
        toast.error("Failed to Buyback. Please try again.");
      }
      console.error("error:", error);
    }
  };
  const validate = (fieldName) => {
    let tempErrors = { ...errors };

    if (!fieldName || fieldName === "Name")
      tempErrors.Name =
        Name && !Name.startsWith(" ")
          ? ""
          : "This field is required and cannot start with a space.";
    if (!fieldName || fieldName === "Type")
      tempErrors.Type = type ? "" : "This field is required.";
    if (!fieldName || fieldName === "goldWeight")
      tempErrors.goldWeight =
        goldWeight && !goldWeight.toString().startsWith(" ")
          ? ""
          : "This field is required and cannot start with a space.";
    if (!fieldName || fieldName === "diamondWeight")
      tempErrors.diamondWeight =
        diamondWeight && !diamondWeight.toString().startsWith(" ")
          ? ""
          : "This field is required and cannot start with a space.";

    if (!fieldName || fieldName === "component1")
      tempErrors.component1 =
        components && components[0] ? "" : "Component 1 is required.";
    if (!fieldName || fieldName === "component2")
      tempErrors.component2 =
        components && components[1] ? "" : "Component 2 is required.";

    if (!fieldName || fieldName === "code")
      tempErrors.code = code.trim()
        ? ""
        : "Code is required and cannot be empty or start with a space.";
    setErrors({ ...tempErrors });
    return Object.keys(tempErrors).every((key) => tempErrors[key] === "");
  };

  useEffect(() => {
    if (!isCustomerInfoModalOpen) {
      // Reset buybackPrice when modal is closed
      setBuybackPrice(null);
    }
  }, [isCustomerInfoModalOpen]);

  useEffect(() => {
    if (valuation.totalPrice !== undefined) {
      setBuybackPrice(valuation.totalPrice);
    }
  }, [valuation.totalPrice]);

  const handleCodeSubmit = () => {
    // Handle code verification logic here
    if (code) {
      handleCloseCodeModal();
      handleOpenCustomerInfoModal();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mt-28">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={3}
          mt={8}
          mb={8}
          maxWidth="1000px"
          mx="auto"
          sx={{
            backgroundColor: "#f0f0f0",
            borderRadius: 8,
            boxShadow: 3,
            padding: 3,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            fontWeight="bold"
            textAlign="center"
          >
            Validation
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={Boolean(errors.Name)}
                  helperText={errors.Name}
                  label="Name"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => validate("Name")}
                  fullWidth
                  variant="outlined"
                  margin="normal"
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
                <FormControl
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.type)}
                >
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                    inputProps={{ style: { color: "gray" } }}
                  >
                    <MenuItem value="Earring">Earring</MenuItem>
                    <MenuItem value="Ring">Ring</MenuItem>
                    <MenuItem value="Necklace">Necklace</MenuItem>
                    <MenuItem value="Bracelet">Bracelet</MenuItem>
                  </Select>
                  {errors.type && (
                    <FormHelperText>{errors.type}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.component1)}
                >
                  <InputLabel>Component 1</InputLabel>
                  <Select
                    value={components[0] || ""}
                    onChange={(e) =>
                      setComponents([e.target.value, components[1]])
                    }
                    required
                    sx={{ color: "gray" }}
                  >
                    <MenuItem value="gold 14k">Gold 14k</MenuItem>
                    <MenuItem value="gold 18k">Gold 18k</MenuItem>
                  </Select>
                  {errors.component1 && (
                    <FormHelperText>{errors.component1}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.component2)}
                >
                  <InputLabel>Component 2</InputLabel>
                  <Select
                    value={components[1] || ""}
                    onChange={(e) =>
                      setComponents([components[0], e.target.value])
                    }
                    required
                    sx={{ color: "gray" }}
                  >
                    <MenuItem value="Natural Diamond">Natural Diamond</MenuItem>
                  </Select>
                  {errors.component2 && (
                    <FormHelperText>{errors.component2}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={Boolean(errors.goldWeight)}
                  helperText={errors.goldWeight}
                  label="Gold Weight"
                  value={goldWeight}
                  onChange={(e) => setGoldWeight(e.target.value)}
                  onBlur={() => validate("goldWeight")}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
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
              <Grid item xs={12} sm={6}>
                <TextField
                  error={Boolean(errors.diamondWeight)}
                  helperText={errors.diamondWeight}
                  label="Diamond Weight"
                  value={diamondWeight}
                  onChange={(e) => setDiamondWeight(e.target.value)}
                  onBlur={() => validate("diamondWeight")}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
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
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{
                    mt: 2,
                    bgcolor: "#388E3C",
                    color: "white",
                    fontWeight: "bold",
                    height: "40px", // Adjust height as needed
                    padding: "8px",
                    "&:hover": {
                      bgcolor: "#D32F2F",
                    },
                    "&:focus": {
                      bgcolor: "black",
                    },
                  }}
                >
                  Upload Images
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </Button>

                <Box
                  display="flex"
                  flexWrap="wrap"
                  gap={2}
                  mt={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  {images.map((image, index) => (
                    <Box
                      key={index}
                      width="100px"
                      height="100px"
                      overflow="hidden"
                      sx={{
                        boxShadow: 1,
                        borderRadius: 1,
                        p: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "background.paper",
                      }}
                    >
                      <img
                        src={image.url}
                        alt={`Upload Preview ${index}`}
                        width="100%"
                        style={{ borderRadius: "4px" }}
                      />
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    bgcolor: "#388E3C",
                    color: "white",
                    fontWeight: "bold",
                    height: "40px", // Adjust height as needed
                    padding: "8px",
                    "&:hover": {
                      bgcolor: "#D32F2F",
                    },
                    "&:focus": {
                      bgcolor: "black",
                    },
                  }}
                >
                  Valuation
                </Button>
              </Grid>
            </Grid>
          </form>
          {buybackPrice && (
            <Typography variant="h5" fontWeight="bold" mt={2}>
              TotalPrice: ${buybackPrice}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleOpenCodeModal}
            sx={{
              mt: 2,
              bgcolor: "#388E3C",
              color: "white",
              fontWeight: "bold",
              height: "40px", // Adjust height as needed
              padding: "8px",
              "&:hover": {
                bgcolor: "#D32F2F",
              },
              "&:focus": {
                bgcolor: "black",
              },
            }}
          >
            Confirm Purchase
          </Button>
          <ToastContainer />
          <Modal
            open={isCustomerInfoModalOpen}
            onClose={handleCloseCustomerInfoModal}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              p={3}
              mt={8}
              mb={8}
              maxWidth="500px"
              mx="auto"
              sx={{
                padding: 3,
                marginTop: "120px",
                marginBottom: "400px",
                backgroundColor: "#f0f0f0",
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Customer Information
              </Typography>
              <Formik
                initialValues={initialValues}
                validationSchema={CustomerSchema}
                onSubmit={async (values, actions) => {
                  try {
                    // Gọi hàm createBuybackOut
                    await dispatch(
                      createBuybackOut(
                        {
                          fullname: values.fullname,
                          mobile: values.mobile,
                          email: values.email,
                        },
                        {
                          name: Name,
                          description: "",
                          goldWeight: goldWeight,
                          diamondWeight: diamondWeight,
                          jewelryCategory: type,
                          code: code,
                          images: images.map((image) => image.url),
                          components: components.filter(Boolean),
                        },
                        jwt
                      )
                    );

                    // Nếu thành công, điều hướng đến trang thành công
                    const customer = {
                      fullname: values.fullname,
                      mobile: values.mobile,
                      email: values.email,
                    };
                    const product = {
                      name: Name,
                      description: "",
                      goldWeight: goldWeight,
                      diamondWeight: diamondWeight,
                      jewelryCategory: type,
                      code: code,
                      images: images.map((image) => image.url),
                      components: components.filter(Boolean),
                    };

                    // navigate("/staff/jewelry/buyback-out-success", {
                    //   state: { buyback: customer, product: product, valuation },
                    // });

                    // Đóng modal và reset trạng thái
                    handleCloseCustomerInfoModal();
                    actions.setSubmitting(false);
                  } catch (error) {
                    // Xử lý lỗi nếu có
                    if (
                      error.response &&
                      error.response.data &&
                      error.response.data.message
                    ) {
                      toast.error(`${error.response.data.message}`);
                    } else {
                      toast.error(
                        "Failed to create buyback. Please try again."
                      );
                    }
                    console.error("error:", error);
                    actions.setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form style={{ width: "100%" }}>
                    <Field
                      as={TextField}
                      name="fullname"
                      label="Full Name"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={touched.fullname && Boolean(errors.fullname)}
                      helperText={touched.fullname && errors.fullname}
                      required
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
                      name="mobile"
                      label="Mobile"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={touched.mobile && Boolean(errors.mobile)}
                      helperText={touched.mobile && errors.mobile}
                      required
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
                      name="email"
                      label="Email"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      required
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
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={isSubmitting}
                      sx={{
                        mt: 2,
                        bgcolor: "#388E3C",
                        color: "white",
                        fontWeight: "bold",
                        height: "40px", // Adjust height as needed
                        padding: "8px",
                        "&:hover": {
                          bgcolor: "#D32F2F",
                        },
                        "&:focus": {
                          bgcolor: "black",
                        },
                      }}
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </Modal>
          <Modal open={isCodeModalOpen} onClose={handleCloseCodeModal}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              p={3}
              mt={8}
              mb={8}
              maxWidth="500px"
              mx="auto"
              sx={{
                padding: 3,
                marginTop: "120px",
                marginBottom: "400px",
                backgroundColor: "#f0f0f0",
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Enter Code
              </Typography>
              <TextField
                error={Boolean(errors.code)}
                helperText={errors.code}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onBlur={() => validate("code")}
                fullWidth
                variant="outlined"
                margin="normal"
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
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCodeSubmit}
                sx={{
                  mt: 2,
                  bgcolor: "#388E3C",
                  color: "white",
                  fontWeight: "bold",
                  height: "40px", // Adjust height as needed
                  padding: "8px",
                  "&:hover": {
                    bgcolor: "#D32F2F",
                  },
                  "&:focus": {
                    bgcolor: "black",
                  },
                }}
              >
                Verify Code
              </Button>
            </Box>
          </Modal>
        </Box>
      </div>
    </div>
  );
};

export default Buy;
