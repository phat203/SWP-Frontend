import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from "react-toastify";
import * as yup from 'yup';
import { createArea } from '../../component/State/Area/Action';
import { uploadImageToCloudinary } from '../util/UploadToCloudinary';

const initialValues = {
    name: "",
    description: "",
    email: "",
    mobile: "",
    openingHours: "Mon-Sun : 9:00 AM - 12:00 PM",
    images: []
}
const noLeadingSpace = (message) => yup.string().test('no-leading-space', message, value => !value || !value.startsWith(' '));

const validationSchema = yup.object({
  name: noLeadingSpace('Name cannot start with a space').required('Name is required'),
  description: noLeadingSpace('Description cannot start with a space').required('Description is required'),
  email: noLeadingSpace('Email cannot start with a space').email('Invalid email format').required('Email is required'),
  mobile: noLeadingSpace('Mobile cannot start with a space')
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits')
    .required('Mobile is required'),
  openingHours: noLeadingSpace('Opening hours cannot start with a space').required('Opening hours are required'),
  images: yup.array().min(1, 'At least one image is required'),
});

const CreateAreaForm = () => {
    const [uploadImage, setUploadImage] = useState(false);
    const dispatch=useDispatch()
    const jwt=localStorage.getItem("jwt");
    
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            try {
                const Data = {
                    name: values.name,
                    description: values.description,
                    contactInformation: {
                        email: values.email,
                        mobile: values.mobile,
                    },
                    OpeningHours: values.openingHours,
                    images: values.images,
                };
                console.log("data ---", Data);

                await dispatch(createArea(Data, jwt));
                toast.success("Area created successfully!");
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                  toast.error(`${error.response.data.message}`);
                } else {
                  toast.error("Failed to Buyback. Please try again.");
                }
                console.error("error:", error);
              }
        },
    });

    const handleImageChange = async(e) => {
        const file = e.target.files[0];
        setUploadImage(true);
        const image = await uploadImageToCloudinary(file);
        console.log("image ---",image);
        formik.setFieldValue("images", [...formik.values.images, image]);
        setUploadImage(false);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...formik.values.images];
        updatedImages.splice(index, 1);
        formik.setFieldValue("images", updatedImages);
    };

    return (
        <>
        <div className='py-10 px-5 items-center justify-center min-h-screen'>
            <div className="lg:max-w-4xl mx-auto">
                <h1 className='font-bold text-2xl text-center py-2'>
                    Add New Jewelry
                </h1>
                <form onSubmit={formik.handleSubmit} className='space-y-4'>
                    <Grid container spacing={2}>
                        <Grid className='flex flex-wrap gap-5' item xs={12}>
                            <input
                                accept='image/*'
                                id='fileInput'
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                                type='file' />
                            <label className='relative' htmlFor='fileInput'>
                                <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600'>
                                    <AddPhotoAlternateIcon className="text-white" />
                                </span>
                                {
                                    uploadImage && <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                                        <CircularProgress />
                                    </div>
                                }
                            </label>
                            <div className='flex flex-wrap gap-2'>
                                {formik.values.images.map((image, index) => (
                                    <div className="relative" key={index}>
                                        <img
                                            className='w-24 h-24 object-cover'
                                            src={image}
                                            alt="" />
                                        <IconButton
                                            size='small'
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                outline: "none"
                                            }}
                                            onClick={() => handleRemoveImage(index)}>
                                            <CloseIcon sx={{fontSize:"1rem"}}/>
                                        </IconButton>
                                    </div>
                                ))}
                                {formik.touched.images && formik.errors.images ? (
                                    <div className="error">{formik.errors.images}</div>
                                ) : null}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
    <TextField fullWidth
        id="name"
        name="name"
        label="Name"
        variant="outlined"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
    />
</Grid>
<Grid item xs={12}>
    <TextField fullWidth
        id="description"
        name="description"
        label="Description"
        variant="outlined"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
    />
</Grid>
<Grid item xs={12} lg={6}>
    <TextField fullWidth
        id="openingHours"
        name="openingHours"
        label="OpeningHours"
        variant="outlined"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.openingHours}
        error={formik.touched.openingHours && Boolean(formik.errors.openingHours)}
        helperText={formik.touched.openingHours && formik.errors.openingHours}
    />
</Grid>
<Grid item xs={12} lg={6}>
    <TextField fullWidth
        id="email"
        name="email"
        label="Email"
        variant="outlined"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
    />
</Grid>
<Grid item xs={12} lg={6}>
    <TextField fullWidth
        id="mobile"
        name="mobile"
        label="Mobile"
        variant="outlined"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.mobile}
        error={formik.touched.mobile && Boolean(formik.errors.mobile)}
        helperText={formik.touched.mobile && formik.errors.mobile}
    />
</Grid>
                    </Grid>
                    <Button variant="contained" color="primary" type="submit">
                        Create Area
                    </Button>
                </form>
            </div>
        </div>
        <ToastContainer/>
        </>
    )
}

export default CreateAreaForm;
