import AddCardIcon from "@mui/icons-material/AddCard";
import {Link, useLocation} from "react-router-dom"
import {
  Box,
  Button,
  Card,
  Divider,
  Modal,
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
import React, { useState } from "react";
import { CartItem } from "./CartItem";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import {
  addItemToCartByCode,
  applyCoupon,
  clearCartAction,
  findCart,
} from "../State/Cart/Action";
import { createOrder } from "../State/Order/Action";
import { EventShow } from "../Profile/EventShow";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  fullname: "",
  mobile: "",
  email: "",
};
const validationSchema = Yup.object({
  fullname: Yup.string()
    .required("Full Name is required")
    .matches(/^\S.*$/, "Cannot start with a space"),
  mobile: Yup.string()
    .required("Mobile is required")
    .matches(/^[^\s].*[^\s]$/, 'Mobile cannot have spaces')
      .length(10, 'Mobile must be exactly 10 characters')
      .matches(/^\d+$/, 'Mobile must be a number'),
  email: Yup.string()
    .required("Email is required")
    .matches(/^\S.*$/, "Cannot start with a space"),
});

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [productCode, setProductCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [customInvoicePercentage] = useState("");
  const { cart } = useSelector((store) => store);
  // const location = useLocation();
  // const { cart } = location.state || {};
  const dispatch = useDispatch();
  const jwt =  localStorage.getItem("jwt")

  const handleClose = () => setOpen(false);

  const handleSubmit = async (values) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        staffId: cart.cart?.staff?.id,
        fullname: values.fullname,
        mobile: values.mobile,
        email: values.email,
        items: cart.cartItems.map((item) => ({
          productId: item.jewelry.id,
          quantity: item.quantity,
          price: item.totalPrice,
        })),
      },
    };
    try {
      await dispatch(createOrder(data));
      dispatch(clearCartAction());
      setOpen(false);
      toast.success("Order created successfully!");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(`${error.response.data.message}`);
      } else {
        toast.error("Failed to create order. Please try again.");
      }
console.error("error:", error);
    }
  };

  const handleOpenAddressModal = () => setOpen(true);

  const handleAddToCart = async () => {
    if (productCode.trim() === "") {
      toast.error("Please enter a product code.");
      return;
    }

    const reqData = {
      jwt: localStorage.getItem("jwt"),
      cartItem: {
        code: productCode,
        quantity: 1,
      },
    };

    try {
      await dispatch(addItemToCartByCode(reqData));
      setProductCode("");
      toast.success("Item added to cart successfully!", {
        autoClose: 500,
      });
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(`${error.response.data}`); // Show specific error message
      } else {
        toast.error("Wrong code. Please try again."); // Fallback error message
      }
      console.error("error:", error);
    }
    dispatch(findCart(jwt));
  };

  const handleApplyCoupon = async () => {
    if (couponCode.trim() === "") {
      toast.error("Please enter a coupon code.");
      return;
    }
  
    try {
      // Áp dụng mã giảm giá
      await dispatch(
        applyCoupon(cart.cart.id, couponCode, localStorage.getItem("jwt"))
      );
  
      // Tìm giỏ hàng sau khi áp dụng mã giảm giá
      await dispatch(findCart(localStorage.getItem("jwt")));
  
      toast.success("Coupon applied successfully!",{
        autoClose: 500,
      }); // Hiển thị thông báo thành công
      setCouponCode(""); // Xóa mã giảm giá sau khi áp dụng
    } catch (error) {
      if (
        error.response &&
        error.response.data 
      ) {
        toast.error(`${error.response.data}`); // Hiển thị thông báo lỗi cụ thể
      } else {
        toast.error("Failed to apply coupon. Please try again."); // Thông báo lỗi dự phòng
      }
      console.error("Coupon apply error:", error);
    }
  };
  

  const handleClearCart = () => {
    dispatch(clearCartAction());
    window.location.reload(); // This should ideally be handled better in a SPA
  };

  const calculateTotal = () => {
    if (cart.cartItems.length === 0) {
      return 0;
    }

    const itemTotal = cart.cart?.total || 0;
    const totalBeforeDiscount = itemTotal;
    const customPercent = parseFloat(customInvoicePercentage);

    if (isNaN(customPercent)) {
      return totalBeforeDiscount;
    } else {
      const invoiceAmount = totalBeforeDiscount * (customPercent / 100);
      return totalBeforeDiscount + invoiceAmount;
    }
  };

  
  
  // const handleNavigateHome = (name, id) => {
  //   navigate(`/staff/jewelry/area/${name}/${id}`);
  // };

  return (
    <>
      <div>
        <main className="lg:flex justify-between  bg-[#fbfbfb]">
          <section className="lg:w-[40%] space-y-6 lg:min-h-screen pt-10">
            {cart.cartItems.length > 0 ? (
              <TableContainer
                component={Paper}
                className="mt-5 mx-auto"
                sx={{ maxWidth: "500px" }}
              >
                <Typography variant="h6" className="p-3">
                  Cart Items
                </Typography>
<Table>
                  <TableHead>
                    <TableRow>

                      <TableCell align="center">Product</TableCell>
                      <TableCell align="center">Price</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.cartItems.map((item, index) => (
                      <TableRow key={`${item.id}-${index}`}>
                        <CartItem key={`${item.id}-${index}`} item={item} />
                        <TableCell align="center">${item.originalPrice}</TableCell>
                        <TableCell align="center">{item.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography
                variant="h6"
                className="p-1"
                sx={{
                  textAlign: "center",
                  backgroundColor: "#F22B2B", // Thêm màu nền
                  color: "white", // Thay đổi màu chữ nếu cần để dễ đọc
                  padding: "2px", // Điều chỉnh padding để đảm bảo văn bản không dính sát vào cạnh
                  borderRadius: "1px", // Thêm viền bo tròn nếu muốn
                  fontWeight: "bold", // Làm cho văn bản đậm
                  //display: "inline-block", // Làm cho chiều rộng phù hợp với nội dung
                }}
              >
                No Product In Cart
              </Typography>
            )}
            <Divider />
            {/* Product Code Input */}
            <Card
              className="flex gap-90 w-80 p-2 mt-2"
              sx={{
                margin: "auto", // Center horizontally
                textAlign: "center", // Center content inside the card
              }}
            >
              <TextField
                label="Product Code"
                variant="outlined"
                fullWidth
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
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
                variant="outlined"
                fullWidth
                onClick={handleAddToCart}
                sx={{
                  color: "green",
borderColor: "green",
                  fontWeight: "bold",
                  width: "120px",
                  "&:hover": {
                    borderColor: "darkyellow",
                    backgroundColor: "lightyellow",
                  },
                }}
              >
                Add
              </Button>
            </Card>
            {/* Coupon Code Input */}
            <Card
              className="flex gap-90 w-80 p-2 mt-2"
              sx={{
                margin: "auto", // Center horizontally
                textAlign: "center", // Center content inside the card
              }}
            >
              <TextField
                label="Coupon Code"
                variant="outlined"
                fullWidth
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
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
                variant="outlined"
                fullWidth
                onClick={handleApplyCoupon}
                sx={{
                  color: "green",
                  borderColor: "green",
                  fontWeight: "bold",
                  width: "120px",
                  "&:hover": {
                    borderColor: "darkyellow",
                    backgroundColor: "lightyellow",
                  },
                }}
              >
                Coupon
              </Button>
            </Card>
            {/* Clear Cart Button */}
            <div className="flex justify-center mt-2">
              <Button
                variant="outlined"
                onClick={handleClearCart}
                sx={{
                  color: "red",
                  borderColor: "red",
                  fontWeight: "bold",
                  width: "200px",
                  marginTop: "10px",
                  "&:hover": {
                    borderColor: "darkred",
                    backgroundColor: "lightcoral",
                  },
                }}
              >
                Clear Cart
              </Button>
            </div>

            {/* Bill Details */}
            <TableContainer
              component={Paper}
              className="mt-5 mx-auto"
              sx={{ maxWidth: "500px" }}
            >
              <Typography variant="h6" className="p-3">
                Bill Details
</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Item Total</TableCell>
                    <TableCell align="right">
                      ${cart.cart?.coupon
                        ? cart.cart.totalamount
                        : calculateTotal()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Discount</TableCell>
                    <TableCell align="right">
                      {cart.cart?.coupon
                        ? `${cart.cart.coupon.discountPercentage}%`
                        : "No coupon applied"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Pay</TableCell>
                    <TableCell align="right">${calculateTotal()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </section>
          <Divider orientation="vertical" flexItem />
          <section className="lg:w-[60%] flex justify-center px-5 pb-0 lg:pb-0">
            <Box>
              <Link to={'/staff/jewelry/area/sale/1'}>
              <Button
                variant="outlined"
                // onClick={handleNavigateHome}
                t
                sx={{
                  color: "red",
                  borderColor: "red",
                  fontWeight: "bold",
                  width: "200px",
                  marginTop: "10px",
                  "&:hover": {
                    borderColor: "darkred",
                    backgroundColor: "lightcoral",
                  },
                }}
              >
                Go to Home
              </Button>
              </Link>
              <Typography
                variant="h4"
                component="h1"
                align="center"
                fontWeight="bold"
                gutterBottom
                py={4}
              >
                Payment Here
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                flexWrap="wrap"
                gap={3}
              >
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: 256,
                    padding: 3,
                    boxShadow: 3,
                  }}
                >
                  <AddCardIcon sx={{ fontSize: 40, color: "gray" }} />
                  <Box textAlign="center" color="gray">
{/* <Typography variant="body1" gutterBottom>
                      Customer Information
                    </Typography> */}
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={handleOpenAddressModal}
                      sx={{
                        color: "green",
                        borderColor: "green",
                        fontWeight: "bold",
                        "&:hover": {
                          borderColor: "darkyellow",
                          backgroundColor: "lightyellow",
                        },
                      }}
                    >
                      Payment
                    </Button>
                  </Box>
                </Card>
                <EventShow/>
              </Box>
              {/* aaaaaa */}
            </Box>
          </section>
        </main>
        {/* Modal for Address */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h2 id="modal-modal-title" className="text-xl font-semibold">
              Enter Information
            </h2>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Form onSubmit={handleSubmit} className="space-y-3 mt-5">
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    name="fullname"
                    value={values.fullname}
                    onChange={handleChange}
                    error={touched.fullname && Boolean(errors.fullname)}
                    helperText={touched.fullname && errors.fullname}
                  />
                  <TextField
                    label="Mobile"
                    variant="outlined"
                    fullWidth
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                    error={touched.mobile && Boolean(errors.mobile)}
                    helperText={touched.mobile && errors.mobile}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <Button type="submit" variant="contained" fullWidth>
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Modal>
      </div>
    </>
  );
};
export default Cart;