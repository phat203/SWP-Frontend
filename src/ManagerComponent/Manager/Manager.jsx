import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { JewelryDetails } from './JewelryDetails'
import { Category } from '../Category/Category'
import Dashboard from '../Dashboard/Dashboard'
import { useDispatch, useSelector } from 'react-redux'
import { Events } from '../Events/Events'
import Ingredients from '../Ingredients/Ingredients'
import CreateMenuForm from '../Menu/CreateMenuForm'
import { Menu } from '../Menu/Menu'
import { Orders } from '../Orders/Orders'
import  AdminSidebar  from './AdminSidebar';
import Home from '../HomeA/Home'
import Teams from '../Staff/Teams'
import Customer from '../Customer/Customer'
import Buyback from '../Buyback/Buyback'
import Area from '../Area/Area';
import { Instock } from '../Menu/Instock';
import {Policy }from '../Policy/Policy';
export const Manager = () => {
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
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/orders' element={<Orders />} />
                        <Route path='/instock' element={<Menu />} />
                        <Route path='/outstock' element={<Instock />} />
                        <Route path='/category' element={<Category />} />
                        <Route path='/ingredients' element={<Ingredients />} />
                        <Route path='/event' element={<Events />} />
                        <Route path='/policy' element={<Policy />} />
                        <Route path='/details' element={<JewelryDetails />} />
                        <Route path='/add-menu' element={<CreateMenuForm />} />
                        <Route path='/buyback' element={<Buyback/>} />
                        <Route path='/teams' element={<Teams/>} />
                        <Route path='/customer' element={<Customer/>} />
                        <Route path='/area' element={<Area/>} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}
