import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComponent, updateComponent } from '../../component/State/Components/Action';
import { updatePolicy } from '../../component/State/Policy/Action';
import { toast } from 'react-toastify';

const Update = ({ component, onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        description : component.description,
    });

    const jwt = localStorage.getItem("jwt");

    const handleSubmit = (e) => {
        e.preventDefault();
        const policyDetails = {
            id: component.id, // Lấy id của component từ props
            name: component.name,
            description : formData.description,
        };

        dispatch(updatePolicy(policyDetails, jwt ));
        dispatch(updatePolicy(policyDetails, jwt ));
        toast.success("update successfully!", {
            autoClose: 500,});
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
                        id="description"
                        name="description"
                        label="description"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={formData.description}
                    />
                    <Button variant="contained" type="submit">
                        Update Policy
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Update;
