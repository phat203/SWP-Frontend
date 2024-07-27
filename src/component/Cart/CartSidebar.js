import React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findCart, removeCartItem, updateCartItem } from "../State/Cart/Action";
import { CartItem } from "./CartItem";

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
            <div className="w-80 p-4 flex flex-col h-full">
                <h2 className="text-xl font-semibold">Cart</h2>
                <div className="flex-grow">
                    {cart.cart?.items.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCheckout}
                    className="mt-4"
                >
                    Checkout
                </Button>
            </div>
        </Drawer>
    );
};

export default CartSidebar;