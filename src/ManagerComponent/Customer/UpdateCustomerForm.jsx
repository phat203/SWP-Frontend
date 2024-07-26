import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateCustomer } from '../../component/State/Customer/Action'; // Ensure to implement this action

const UpdateCustomerForm = ({ customer, onClose }) => {
  const [formData, setFormData] = useState({ ...customer });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCustomer(formData));
    onClose();
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Cập nhật thông tin khách hàng
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Tên"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Số điện thoại"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Điểm Tích Luỹ"
          name="loyaltyPoints"
          value={formData.loyaltyPoints}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={onClose} variant="outlined" color="secondary" sx={{ mr: 2 }}>
            Hủy
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Cập nhật
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default UpdateCustomerForm;
