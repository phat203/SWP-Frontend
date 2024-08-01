import {
  Alert,
  Button,
  TextField
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { createPolicy } from "../../component/State/Policy/Action";
  
  const CreatePolicy = () => {
    const dispatch = useDispatch();
    const [formData, setFormData, ] = useState({
      name: "",
      description: "",
    });
    const [error, setError] = useState('');
    const jwt = localStorage.getItem("jwt");
  
    const validateForm = () => {
      if (!formData.name || formData.description === "") {
        setError('All fields are required.');
        return false;
      }
      if (formData.name.startsWith(' ') || formData.description.toString().startsWith(' ')) {
        setError('Fields cannot start with a space.');
        return false;
      }
      setError('');
      return true;
  };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;
  
      const policy = {
        name: formData.name,
        description: formData.description,
      };
  
      try {
        await dispatch(createPolicy(policy, jwt));
        console.log("Ingredient created:", policy);
        toast.success("Category created successfully!");
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(`${error.response.data.message}`);
        } else {
          toast.error("Wrong name. Please try again.");
        }
        console.error("error:", error);
      }
  };
  
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    return (
      <>
      <div className="">
        <div className="p-5">
          <h1
            className="text-black text-center text-xl pb-10"
            style={{ fontSize: "30px" }}
          >
            Create Policy
          </h1>
          {error && <Alert severity="error">{error}</Alert>}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              onChange={handleInputChange}
              value={formData.name}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "gray",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "gray",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "gray",
                },
              }}
            />
            <TextField
              fullWidth
              id="description"
              name="description"
              label="description"
              variant="outlined"
              onChange={handleInputChange}
              value={formData.description}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "gray",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "gray",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "gray",
                },
              }}
            />
  
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: "100%",
                mt: 2,
                bgcolor: "#0B4CBB",
                color: "white",
                fontWeight: "bold",
                height: "40px", // Adjust height as needed
                padding: "8px",
                "&:hover": {
                  bgcolor: "darkorange",
                },
                "&:focus": {
                  bgcolor: "black",
                },
              }}
            >
              Create Policy
            </Button>
          </form>
        </div>
      </div>
      <ToastContainer/>
      </>
      
    );
  };
  
  export default CreatePolicy;
  