import {
  Button,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateComponent,
} from "../../component/State/Components/Action";

const UpdateForm = ({ component, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    price: component.price,
    pricebuyback: component.pricebuyback,
  });
  const [error, setError] = useState('');

  const jwt = localStorage.getItem("jwt");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: component.id,
      name: component.name,
      price: formData.price,
      pricebuyback: formData.pricebuyback,
    };

    dispatch(updateComponent({ data, jwt }));
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = '';

    if (value.trim() === '') {
      errorMessage = 'Values cannot be empty or contain only spaces.';
    } else if (isNaN(value) || value < 0) {
      errorMessage = 'Values must be non-negative numbers.';
    } else if (name === 'price' && parseFloat(value) <= parseFloat(formData.pricebuyback)) {
      errorMessage = 'Price must be greater than Price Buyback.';
    } else if (name === 'pricebuyback' && parseFloat(value) >= parseFloat(formData.price)) {
      errorMessage = 'Price Buyback must be less than Price.';
    }

    setFormData({
      ...formData,
      [name]: value,
    });
    setError(errorMessage);
  };

  return (
    <div className="">
      <div className="p-5">
        <h1
          className="text-black text-center text-xl pb-10"
          style={{ fontSize: "30px" }}
        >
          Create Ingredient
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="price"
            name="price"
            label="Price"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.price}
            error={!!error}
            helperText={error}
          />
          <TextField
            fullWidth
            id="pricebuyback"
            name="pricebuyback"
            label="Price Buyback"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.pricebuyback}
            error={!!error}
            helperText={error}
          />

          <Button variant="contained" type="submit" disabled={!!error}>
            Update Category
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;