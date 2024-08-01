import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updatePolicy } from '../../component/State/Policy/Action';

const Update = ({ component, onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        description: component.description,
    });

    const jwt = localStorage.getItem("jwt");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate description
        if (formData.description.trim() === '') {
            toast.error("Description cannot be empty or contain only spaces.", {
                autoClose: 500,
            });
            return;
        }

        const policyDetails = {
            id: component.id, // Lấy id của component từ props
            name: component.name,
            description: formData.description,
        };

        dispatch(updatePolicy(policyDetails, jwt));
        toast.success("Update successfully!", {
            autoClose: 500,
        });
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