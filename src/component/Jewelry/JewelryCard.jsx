import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const JewelryCard = ({ item }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/item/${item.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, m: 2, borderRadius: 2, boxShadow: 3 }}>
      <CardActionArea onClick={handleNavigate}>
        <CardMedia
          component="img"
          height="200"
          image={item.images[0]}
          alt={item.name}
          sx={{ borderRadius: "8px 8px 0 0" }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default JewelryCard;
