import CreateIcon from "@mui/icons-material/Create";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Modal,
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
import { getAllCategory } from "../../component/State/Categories/Action";
import CreateCategoryForm from "./CreateCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function CategoryTable() {
  const { category } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getAllCategory({ jwt }));
  }, [dispatch, jwt]);

  useEffect(() => {
    setFilteredCategories(category.categories);
  }, [category.categories]);

  const handleSearch = () => {
    const filtered = category.categories.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  return (
    <Box sx={{ padding: 3, minHeight: "100vh" }}>
      <Card sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="create category">
              <CreateIcon />
            </IconButton>
          }
          title={"Category Jewelry"}
          sx={{
            pt: 2,
            pb: 1,
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
            backgroundColor: "#0B4CBB",
            color: "#fff",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: 2,
            gap: 1,
          }}
        >
          <TextField
            id="search-input"
            label="Search by Name"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#0B4CBB",
                },
                "&:hover fieldset": {
                  borderColor: "#0B4CBB",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#0B4CBB",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#0B4CBB",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#0B4CBB",
              },
            }}
          />
          <IconButton
            aria-label="search"
            onClick={handleSearch}
            sx={{ color: "#0B4CBB" }}
          >
            <SearchIcon />
          </IconButton>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="category table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#0B4CBB" }}>
                <TableCell align="left">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    ID
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Name
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                      "&:hover": { backgroundColor: "#e0e0e0" },
                    }}
                  >
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No categories not found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <CreateCategoryForm />
        </Box>
      </Modal>
    </Box>
  );
}
