import React, { useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateAreaStatus } from '../../component/State/Area/Action';

export const JewelryDetails = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { area } = useSelector(store => store);
    const dispatch = useDispatch();

    const handleJewelryStatus = () => {
        setIsOpen(!isOpen);
        dispatch(updateAreaStatus({
            areaId: area.usersArea?.id,
            jwt: localStorage.getItem("jwt")
        }));
    };

    return (
        <div className='lg:px-20 px-5 pb-10'>
            <div className='py-5 flex justify-center items-center gap-5'>
                <Typography variant="h4" className='text-center font-bold' style={{ color: 'black' }}>
                    {area.usersArea?.name}
                </Typography>
                <Button
                    color={area.usersArea?.open ? "error" : "primary"}
                    className='py-2 px-4'
                    variant='contained'
                    onClick={handleJewelryStatus}
                    size='large'
                >
                    {area.usersArea?.open ? "Close" : "Open"}
                </Button>
            </div>
            <Grid container spacing={4}>
                <Grid item xs={12} lg={6}>
                    <Card>
                        <CardHeader title={<Typography variant="h6" className='text-gray-300'>Jewelry</Typography>} />
                        <CardContent>
                            <div className='space-y-4'>
                                <div className='flex'>
                                    <Typography variant="subtitle1" className='w-48' style={{ color: 'black', fontWeight: 'bold' }}>Staff</Typography>
                                    <Typography variant="body1" className='text-gray-400' style={{ color: 'black', fontWeight: 'bold' }}>
                                        {area.usersArea?.staff.fullname}
                                    </Typography>
                                </div>
                                <div className='flex'>
                                    <Typography variant="subtitle1" className='w-48' style={{ color: 'black', fontWeight: 'bold' }}>Jewelry name</Typography>
                                    <Typography variant="body1" className='text-gray-400' style={{ color: 'black', fontWeight: 'bold' }}>
                                        {area.usersArea?.name}
                                    </Typography>
                                </div>
                                <div className='flex'>
                                    <Typography variant="subtitle1" className='w-48' style={{ color: 'black', fontWeight: 'bold' }}>Jewelry Type</Typography>
                                    <Typography variant="body1" className='text-gray-400' style={{ color: 'black', fontWeight: 'bold' }}>
                                        {area.usersArea?.type}
                                    </Typography>
                                </div>
                                <div className='flex'>
                                    <Typography variant="subtitle1" className='w-48' style={{ color: 'black', fontWeight: 'bold' }}>Opening Hours</Typography>
                                    <Typography variant="body1" className='text-gray-400' style={{ color: 'black', fontWeight: 'bold' }}>
                                        {area.usersArea?.openingHours}
                                    </Typography>
                                </div>
                                <div className='flex'>
                                    <Typography variant="subtitle1" className='w-48' style={{ color: 'black', fontWeight: 'bold' }}>Status</Typography>
                                    <Typography variant="body1" style={{ color: 'black', fontWeight: 'bold' }}>
                                        {area.usersArea?.open ? 
                                            <span className='px-3 py-1 rounded-full bg-green-400 text-gray-950'>Open</span>
                                            : 
                                            <span className='px-3 py-1 rounded-full bg-red-400 text-gray-950'>Closed</span>
                                        }
                                    </Typography>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Card>
                        <CardHeader title={<Typography variant="h6" className='text-gray-300'>Contact</Typography>} />
                        <CardContent>
                            <div className='space-y-4'>
                                <div className='flex'>
                                    <Typography variant="subtitle1" className='w-48' style={{ color: 'black', fontWeight: 'bold' }}>Email</Typography>
                                    <Typography variant="body1" className='text-gray-400' style={{ color: 'black', fontWeight: 'bold' }}>
                                        {area.usersArea?.contactInformation?.email}
                                    </Typography>
                                </div>
                                <div className='flex'>
                                    <Typography variant="subtitle1" className='w-48' style={{ color: 'black', fontWeight: 'bold' }}>Mobile</Typography>
                                    <Typography variant="body1" className='text-gray-400' style={{ color: 'black', fontWeight: 'bold' }}>
                                        {area.usersArea?.contactInformation?.mobile}
                                    </Typography>
                                </div>
                                <div className='flex'>
                                    <Typography variant="subtitle1" className='w-48' style={{ color: 'black', fontWeight: 'bold' }}>Social</Typography>
                                    <div className='flex items-center gap-2'>
                                        <a href={area.userArea?.contactInformation?.instagram}>
                                            <InstagramIcon sx={{ fontSize: "3rem", color: 'black' }} />
                                        </a>
                                        <a href={area.userArea?.contactInformation?.facebook}>
                                            <FacebookIcon sx={{ fontSize: "3rem", color: 'black' }} />
                                        </a>
                                        <a href='/'>
                                            <LinkedInIcon sx={{ fontSize: "3rem", color: 'black' }} />
                                        </a>
                                        <a href='/'>
                                            <XIcon sx={{ fontSize: "3rem", color: 'black' }} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};
