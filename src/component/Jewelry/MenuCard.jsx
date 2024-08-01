import React, { useState } from "react";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Box,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../State/Cart/Action";
import { toast } from "react-toastify";

const MenuCart = ({ item }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [showDialog, setShowDialog] = useState(false);

  const handleAddItemToCart = (e) => {
    e.preventDefault();
    const reqData = {
      jwt: localStorage.getItem("jwt"),
      cartItem: {
        jewelryId: item.id,
        quantity: 1,
      },
    };
    dispatch(addItemToCart(reqData));
    toast.success("Item added to cart successfully!", {
      autoClose: 500, // The toast will disappear after 1 second (1000 milliseconds)
    });
    console.log("req Data", reqData);
  };

  const handleImageClick = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <>
      <Card
        elevation={3}
        sx={{
          mb: 2,
          borderRadius: "10px",
          overflow: "hidden",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", padding: "1rem" }}>
          <img
            src={item.images[0]}
            alt={item.name}
            style={{
              width: isSmallScreen ? "4rem" : "5rem",
              height: isSmallScreen ? "4rem" : "5rem",
              objectFit: "cover",
              borderRadius: "10%",
              marginRight: "1rem",
              cursor: "pointer",
            }}
            onClick={handleImageClick}
          />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              component="h2"
              noWrap
              sx={{ fontWeight: "bold" }}
            >
              {item.code}
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 1, color: "primary.main", fontWeight: "bold" }}
            >
              {item.price} USD
            </Typography>
          </Box>
        </Box>
        <CardContent>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            <span className="font-medium">{item.name}</span>
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: "1rem" }}>
          <Button
            variant="contained"
            onClick={handleAddItemToCart}
            fullWidth
            startIcon={<AddShoppingCartIcon />}
            sx={{
              mt: 2,
              backgroundColor: '#007bff',
              color: '#fff',
              fontWeight: 'bold',
              '&:hover': {
                  backgroundColor: '#0056b3',
              },
              borderRadius: 2,
              boxShadow: 'none',
              textTransform: 'none',
          }}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
      <Dialog open={showDialog} onClose={handleCloseDialog}>
        <DialogTitle>{item.code}</DialogTitle>
        <DialogContent>
        <Typography variant="body2" color="textSecondary">
        <img
            src={item.images[0]}
          />
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {item.name}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MenuCart;
