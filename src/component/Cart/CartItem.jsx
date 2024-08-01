import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { findCart, removeCartItem, updateCartItem } from "../State/Cart/Action";

const CartItem = ({ item }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleRemoveCartItem = async () => {
    try {
      await dispatch(
        removeCartItem({ cartItemId: item.id, jwt: auth.jwt || jwt })
      );
      await dispatch(findCart(jwt));
    } catch (error) {
      console.error("Lỗi khi xóa item trong giỏ hàng:", error);
    }
  };

  const handleUpdateCartItem = async (value) => {
    try {
      if (value === -1 && item.quantity === 1) {
        await handleRemoveCartItem();
        return;
      }

      const data = { cartItemId: item.id, quantity: item.quantity + value };
      await dispatch(updateCartItem({ data, jwt }));
      await dispatch(findCart(jwt));
    } catch (error) {
      console.error("Lỗi khi cập nhật item trong giỏ hàng:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Box
        component="img"
        src={item.jewelry.images[0]}
        alt={item.jewelry.name}
        sx={{
          width: 64,
          height: 64,
          objectFit: "cover",
          borderRadius: 1,
          marginRight: 2,
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body1" gutterBottom>
          {item.jewelry.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="small"
            onClick={() => handleUpdateCartItem(-1)}
            disabled={item.quantity <= 1}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              width: 32,
              textAlign: "center",
            }}
          >
            {item.quantity}
          </Typography>
          <IconButton size="small" onClick={() => handleUpdateCartItem(1)}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Box>
      </Box>
      <IconButton size="small" onClick={handleRemoveCartItem}>
        <DeleteOutlineIcon color="error" />
      </IconButton>
    </Box>
  );
};

export default CartItem;
