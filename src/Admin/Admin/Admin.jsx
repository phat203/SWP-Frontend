import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Category } from '../../ManagerComponent/Category/Category'
import Dashboard from '../../ManagerComponent/Dashboard/Dashboard'

import { useDispatch, useSelector } from 'react-redux'
import Home from '../../ManagerComponent/HomeA/Home'
import  AdminSidebar from './AdminSideBar'
import User from '../../ManagerComponent/Staff/User'
import Customer from '../../ManagerComponent/Customer/Customer'
import ListBan from '../../ManagerComponent/Staff/ListBan'
export const Admin = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const { jewelry } = useSelector(store => store);
    const handleClose = () => { }


    return (
        <div>
            <div className='lg:flex justify-between'>
                <div>
                    <AdminSidebar handleClose={handleClose} />
                </div>
                <div className='lg:w-[85%]'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/dashboard' element={<Dashboard />}/>
                        <Route path='/user' element={<User/>} />
                        <Route path='/ban' element={<ListBan/>} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}
