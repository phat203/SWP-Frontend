import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import OrdersCard from './OrderCard';

const orderStatus = [
  { label: "PENDING", value: "PENDING" },
  { label: "COMPLETED", value: "COMPLETED" },
  { label: "All", value: "ALL" }
];

export const Orders = () => {
  const [filterValue, setFilterValue] = useState("ALL");

  const handleFilter = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <div>
      <OrdersCard />
    </div>
  );
};
