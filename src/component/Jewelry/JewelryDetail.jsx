import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
  TextField,
  Pagination,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { getAreaById } from "../State/Area/Action";
import { getAllCategory } from "../State/Categories/Action";
import { getMenuItemsByJewelryId } from "../State/Menu/Action";
import MenuCard from "./MenuCard";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

const jewelryTypes = [
  { label: "ALL", value: "all" },
  { label: "Gold", value: "Gold" },
  { label: "Platinum", value: "Platinum" },
  { label: "Silver", value: "Silver" },
];

const ITEMS_PER_PAGE = 8;

const JewelryDetails = () => {
  const [jewelryType, setJewelryType] = useState("all");
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("price_low_to_high");
  const [searchQuery, setSearchQuery] = useState("");
  const [actualSearchQuery, setActualSearchQuery] = useState(""); // New state for actual search query
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { area, menu } = useSelector((store) => store);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAreaById({ jwt, areaId: id }));
  }, [dispatch, jwt, id]);

  useEffect(() => {
    dispatch(getAllCategory({ jwt }));
  }, [dispatch, jwt]);

  useEffect(() => {
    dispatch(getMenuItemsByJewelryId({ jwt }));
  }, [dispatch, jwt]);

  useEffect(() => {
    // Trigger search when actualSearchQuery changes
    dispatch(getMenuItemsByJewelryId({ jwt, query: actualSearchQuery }));
  }, [actualSearchQuery, dispatch, jwt]);

  const handleFilter = (e) => {
    setJewelryType(e.target.value);
  };

  const handleFilterByPrice = (range) => {
    setPriceRange(range);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    setActualSearchQuery(searchQuery.trim()); // Update the actual search query state
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredItems = menu.menuItems
    .filter((item) =>
      jewelryType === "all" ? true : item.type === jewelryType
    )
    .filter((item) => {
      switch (priceRange) {
        case "50-200":
          return item.price >= 50 && item.price <= 200;
        case "200-1000":
          return item.price >= 200 && item.price <= 1000;
        case "1000+":
          return item.price > 1000;
        default:
          return true;
      }
    })
    .filter(
      (item) =>
        !actualSearchQuery
          ? true
          : item.name.toLowerCase().includes(actualSearchQuery.toLowerCase()) // Check if actualSearchQuery is empty
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price_low_to_high":
          return a.price - b.price;
        case "price_high_to_low":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const radioStyles = {
    "&.Mui-checked": {
      color: "#1976d2",
    },
  };

  const formControlStyles = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#1976d2",
      },
      "&:hover fieldset": {
        borderColor: "#1976d2",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1976d2",
      },
    },
  };

  const paginationStyles = {
    "& .MuiPaginationItem-root": {
      borderRadius: "4px",
    },
    "& .MuiPaginationItem-page.Mui-selected": {
      backgroundColor: "#1976d2",
      color: "#fff",
    },
  };

  return (
    <div>
      <Navbar />
      <div className="px-5 lg:px-20 py-10 bg-gray-50">
        <section>
          <div className="mt-24">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <img
                  className="w-full h-[30vh] object-cover rounded-lg shadow-md"
                  src={area.area?.images[0]}
                  alt=""
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <img
                  className="w-full h-[40vh] object-cover rounded-lg shadow-md"
                  src="https://images.pexels.com/photos/9838851/pexels-photo-9838851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <img
                  className="w-full h-[40vh] object-cover rounded-lg shadow-md"
                  src="https://images.pexels.com/photos/20796890/pexels-photo-20796890/free-photo-of-vang-nh-n-trang-s-c-kim-c-ng.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
                />
              </Grid>
            </Grid>
          </div>
        </section>
        <Divider />
        <div className="mt-12 text-center mb-5">
          <h1 className="text-5xl font-semibold">List of Products</h1>
        </div>
        <section className="lg:flex relative">
          <div className="space-b-10 lg:w-[30%] filter">
            <div className="box space-y-5 lg:sticky top-0 bg-white p-5 rounded-lg shadow-md">
              <div>
                <div className="mb-4">
                  <Typography variant="h5" sx={{ color: "gray" }}>
                    Search
                  </Typography>
                  <div className="flex items-center">
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <IconButton onClick={handleSearchClick}>
                      <SearchIcon color="action" />
                    </IconButton>
                  </div>
                </div>
                <Divider />
                <Typography variant="h5" sx={{ color: "gray" }}>
                  Sort By
                </Typography>
                <FormControl
                  variant="outlined"
                  className="w-full"
                  sx={formControlStyles}
                >
                  <Select value={sortBy} onChange={handleSortChange}>
                    <MenuItem value="price_low_to_high">
                      Price: Low to High
                    </MenuItem>
                    <MenuItem value="price_high_to_low">
                      Price: High to Low
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <Divider />
              <div>
                <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                  Price Range
                </Typography>
                <FormControl className="py-10 space-y-5" component={"fieldset"}>
                  <RadioGroup>
                    <FormControlLabel
                      value=""
                      control={<Radio sx={radioStyles} />}
                      label="All"
                      onChange={() => handleFilterByPrice("")}
                    />
                    <FormControlLabel
                      value="50-200"
                      control={<Radio sx={radioStyles} />}
                      label="50 USD - 200 USD"
                      onChange={() => handleFilterByPrice("50-200")}
                    />
                    <FormControlLabel
                      value="200-1000"
                      control={<Radio sx={radioStyles} />}
                      label="200 USD - 1000 USD"
                      onChange={() => handleFilterByPrice("200-1000")}
                    />
                    <FormControlLabel
                      value="1000+"
                      control={<Radio sx={radioStyles} />}
                      label="1000 USD +"
                      onChange={() => handleFilterByPrice("1000+")}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <Divider />
              {/* <div>
                <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                  Jewelry Type
                </Typography>
                <FormControl component={"fieldset"}>
                  <RadioGroup
                    value={jewelryType}
                    onChange={handleFilter}
                    aria-label="jewelry-type"
                  >
                    {jewelryTypes.map((type) => (
                      <FormControlLabel
                        key={type.value}
                        value={type.value}
                        control={<Radio sx={radioStyles} />}
                        label={type.label}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div> */}
            </div>
          </div>
          <div className="lg:w-[5%]"></div>
          <div className="lg:w-[80%]">
            <Grid container spacing={2}>
              {paginatedItems.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <MenuCard item={item} />
                </Grid>
              ))}
            </Grid>
            <div className="mt-5 flex justify-center">
              <Pagination
                count={Math.ceil(filteredItems.length / ITEMS_PER_PAGE)}
                page={currentPage}
                onChange={handlePageChange}
                sx={paginationStyles}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default JewelryDetails;
