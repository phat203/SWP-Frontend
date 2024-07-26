import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComponent, updateComponent } from '../../component/State/Components/Action';

const UpdateForm = ({ component, onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        price: component.price,
        pricebuyback: component.pricebuyback,
    });

    const jwt = localStorage.getItem("jwt");

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            id: component.id, // Lấy id của component từ props
            name: component.name,
            price: formData.price,
            pricebuyback: formData.pricebuyback,
        };

        dispatch(updateComponent({data, jwt }));
        onClose(); // Đóng modal sau khi cập nhật thành công
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    return (
        <div className=''>
            <div className='p-5'>
                <h1 className='text-black text-center text-xl pb-10' style={{ fontSize: '30px' }}>Create Ingredient</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        id="price"
                        name="price"
                        label="Price"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={formData.price}
                    />
                    <TextField
                        fullWidth
                        id="pricebuyback"
                        name="pricebuyback"
                        label="Price Buyback"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={formData.pricebuyback}
                    />

                    

                    <Button variant="contained" type="submit">
                        Update Category
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default UpdateForm;
