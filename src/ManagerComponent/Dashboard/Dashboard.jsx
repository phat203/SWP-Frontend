import {
  Button,
  Grid,
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
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  ArcElement,
  Chart as ChartJS,
  Legend as ChartLegend,
  Tooltip as ChartTooltip,
  Title,
} from "chart.js";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend as RechartsLegend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getAllAreaAction } from "../../component/State/Area/Action";
import {
  getDashboardBuybackStats,
  getDashboardBuybackStatsByAreas,
  getDashboardStats,
  getDashboardStatsByAreas,
  getTopSellingProducts,
} from "../../component/State/DashBoard/Action";

ChartJS.register(Title, ChartTooltip, ChartLegend, ArcElement);

const Dashboard = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [SDate] = useState(dayjs());
  const [EDate] = useState(dayjs().add(1, "day"));
  const [errors, setErrors] = useState({});

  const { dashboard, area } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getAllAreaAction(jwt));
  }, [dispatch, jwt]);

  useEffect(() => {
    const formattedStartDate = dayjs(SDate).format("YYYY-MM-DD");
    const formattedEndDate = dayjs(EDate).format("YYYY-MM-DD");
    const areaIds = area.areas?.map((area) => area.id) || [];
    dispatch(getDashboardStats(formattedStartDate, formattedEndDate, jwt));
    dispatch(
      getDashboardStatsByAreas(
        formattedStartDate,
        formattedEndDate,
        areaIds,
        jwt
      )
    );
    dispatch(
      getDashboardBuybackStats(formattedStartDate, formattedEndDate, jwt)
    );
    dispatch(
      getDashboardBuybackStatsByAreas(
        formattedStartDate,
        formattedEndDate,
        areaIds,
        jwt
      )
    );
    dispatch(getTopSellingProducts(formattedStartDate, formattedEndDate, jwt));
  }, [dispatch, jwt, SDate, EDate, area.areas]);

  const validateDates = (newValue, field) => {
    if (field === "startDate" && newValue && endDate && newValue > endDate) {
      setErrors((prev) => ({
        ...prev,
        startDate: "Ngày bắt đầu phải trước ngày kết thúc.",
      }));
    } else if (
      field === "endDate" &&
      newValue &&
      startDate &&
      newValue < startDate
    ) {
      setErrors((prev) => ({
        ...prev,
        endDate: "Ngày kết thúc phải sau ngày bắt đầu.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    validateDates(date, "startDate");
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    validateDates(date, "endDate");
  };

  const handleSearch = () => {
    if (!errors.startDate && !errors.endDate && startDate && endDate) {
      const formattedStartDate = dayjs(startDate).format("YYYY-MM-DD");
      const formattedEndDate = dayjs(endDate).format("YYYY-MM-DD");
      const areaIds = area.areas?.map((area) => area.id) || [];
      dispatch(getDashboardStats(formattedStartDate, formattedEndDate, jwt));
      dispatch(
        getDashboardStatsByAreas(
          formattedStartDate,
          formattedEndDate,
          areaIds,
          jwt
        )
      );
      dispatch(
        getDashboardBuybackStats(formattedStartDate, formattedEndDate, jwt)
      );
      dispatch(
        getDashboardBuybackStatsByAreas(
          formattedStartDate,
          formattedEndDate,
          areaIds,
          jwt
        )
      );
      dispatch(
        getTopSellingProducts(formattedStartDate, formattedEndDate, jwt)
      );
    }
  };

  // Combine the data for the bar chart
  const combinedData = [
    {
      name: "Total Orders",
      Orders: dashboard.all?.totalOrders ?? 0,
      Buybacks: dashboard.buybackAll?.totalBuybacks ?? 0,
    },
    {
      name: "Total Amount",
      Orders: dashboard.all?.totalAmount ?? 0,
      Buybacks: dashboard.buybackAll?.totalAmount ?? 0,
    },
    {
      name: "Total Sold Items",
      Orders: dashboard.all?.totalItems ?? 0,
      Buybacks: dashboard.buybackAll?.totalItems ?? 0,
    },
  ];

  // Prepare data for the Doughnut chart
  const doughnutData = {
    labels: area.areas?.map((a) => a.name) || [], // Area names
    datasets: [
      {
        label: "Total Orders by Area",
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        data:
          area.areas?.map((a) => dashboard.areas?.[a.id]?.totalOrders || 0) ||
          [],
      },
    ],
  };

  const order = {
    labels: area.areas?.map((a) => a.name) || [], // Area names
    datasets: [
      {
        label: "Total Orders by Area",
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        data:
          area.areas?.map((a) => dashboard.areas?.[a.id]?.totalAmount || 0) ||
          [],
      },
    ],
  };

  const Items = {
    labels: area.areas?.map((a) => a.name) || [], // Area names
    datasets: [
      {
        label: "Total Orders by Area",
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        data:
          area.areas?.map((a) => dashboard.areas?.[a.id]?.totalItems || 0) ||
          [],
      },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, backgroundColor: "#f4f4f4" }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Date Start
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date Start"
                value={startDate}
                onChange={handleStartDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors.startDate}
                    helperText={errors.startDate}
                    fullWidth
                  />
                )}
                inputFormat="YYYY-MM-DD"
              />
            </LocalizationProvider>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, backgroundColor: "#f4f4f4" }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Date End
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date End"
                value={endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors.endDate}
                    helperText={errors.endDate}
                    fullWidth
                  />
                )}
                inputFormat="YYYY-MM-DD"
              />
            </LocalizationProvider>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={
              !!errors.startDate || !!errors.endDate || !startDate || !endDate
            }
            sx={{ backgroundColor: "#4CAF50", color: "#fff" }}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h4" sx={{ mt: 4, color: "#3f51b5" }}>
        Order & Buyback Summary
      </Typography>
      <div style={{ marginTop: "20px" }}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={combinedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <RechartsLegend />
            <Bar dataKey="Orders" fill="#FF0000" />
            <Bar dataKey="Buybacks" fill="#008000" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Typography variant="h4" sx={{ mt: 4, color: "#3f51b5" }}>
        Statistics by Area
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <div style={{ flex: 1, margin: "0 10px" }}>
          <ResponsiveContainer width="100%" height={400}>
            <Doughnut
              data={doughnutData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Total Orders by Area",
                    font: {
                      size: 20,
                    },
                    color: "#3f51b5",
                  },
                  legend: {
                    display: true,
                    position: "right",
                    labels: {
                      color: "#333",
                    },
                  },
                },
              }}
            />
          </ResponsiveContainer>
        </div>
        <div style={{ flex: 1, margin: "0 10px" }}>
          <ResponsiveContainer width="100%" height={400}>
            <Doughnut
              data={order}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Total Amount by Area",
                    font: {
                      size: 20,
                    },
                    color: "#3f51b5",
                  },
                  legend: {
                    display: true,
                    position: "right",
                    labels: {
                      color: "#333",
                    },
                  },
                },
              }}
            />
          </ResponsiveContainer>
        </div>
        <div style={{ flex: 1, margin: "0 10px" }}>
          <ResponsiveContainer width="100%" height={400}>
            <Doughnut
              data={Items}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Total Items by Area",
                    font: {
                      size: 20,
                    },
                    color: "#3f51b5",
                  },
                  legend: {
                    display: true,
                    position: "right",
                    labels: {
                      color: "#333",
                    },
                  },
                },
              }}
            />
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <Typography variant="h4" sx={{ mt: 4, color: "#3f51b5" }}>
          Top Product
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="Center">Jewelry Code</TableCell>
                <TableCell align="Center">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dashboard.topSellingProducts?.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.jewelry.name}</TableCell>
                  <TableCell>{product.jewelry.code}</TableCell>
                  <TableCell align="Center">{product.totalQuantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Dashboard;
