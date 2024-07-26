import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Manager } from '../ManagerComponent/Manager/Manager';
export const ManagerRoute = () => {
    return (
        <div>
            <Routes>
                <Route path="/*" element={ <Manager/>}         
                ></Route>
            </Routes>
        </div>
    );
};