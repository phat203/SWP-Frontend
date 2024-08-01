import React from "react";
import { Drawer, Button, Typography, Divider, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findCart, removeCartItem, updateCartItem } from "../State/Cart/Action";
import CartItem from "./CartItem";

const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();

  const handleRemoveCartItem = async (itemId) => {
    try {
      await dispatch(removeCartItem({ cartItemId: itemId, jwt }));
      await dispatch(findCart(jwt));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleUpdateCartItem = async (item, value) => {
    try {
      const data = { cartItemId: item.id, quantity: item.quantity + value };
      await dispatch(updateCartItem({ data, jwt }));
      await dispatch(findCart(jwt));
    } catch (error) {
      console.error("Error updating item in cart:", error);
    }
  };

  const handleCheckout = () => {
    window.location.href = "/staff/jewelry/cart";
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box
        sx={{
          width: 320,
          p: 3,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px 0 0 8px",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          Your Cart
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 2 }}>
          {cart.cart?.items.length > 0 ? (
            cart.cart.items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={() => handleRemoveCartItem(item.id)}
                onUpdateQuantity={(value) => handleUpdateCartItem(item, value)}
              />
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              Your cart is empty.
            </Typography>
          )}
        </Box>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckout}
          sx={{
            mt: 2,
            backgroundColor: "#007bff",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
            borderRadius: 2,
            boxShadow: "none",
            textTransform: "none",
          }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Drawer>
  );
};

export default CartSidebar;
