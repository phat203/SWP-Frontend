import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Manager } from '../ManagerComponent/Manager/Manager';
import { CustomerRoute } from './CustomerRoute';
export const StaffRoute = () => {
    return (
        <div>
            <Routes>
                <Route path="/*" element={ <CustomerRoute/>}         
                ></Route>
            </Routes>
        </div>
    );
};