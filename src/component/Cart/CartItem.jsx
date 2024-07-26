import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findCart, removeCartItem, updateCartItem } from "../State/Cart/Action";

export const CartItem = ({ item }) => {
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleRemoveCartItem = async () => {
    try {
      await dispatch(removeCartItem({ cartItemId: item.id, jwt: auth.jwt || jwt }));
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
    <div className="px-5">
      <div className="lg:flex">
        <div>
          <img
            className="w-[5rem] h-[5rem] object-cover"
            src={item.jewelry.images[0]}
            alt=""
          />
        </div>
        <div className="flex items-center justify-between lg:w-[70%]">
          <div className="space-y-1 lg:space-y-3 w-full">
            <p>{item.jewelry.name}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <IconButton onClick={() => handleUpdateCartItem(-1)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <div className="w-5 h-5 text-xs flex items-center justify-center">
                  {item.quantity}
                </div>
                <IconButton onClick={() => handleUpdateCartItem(1)}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
