import React, { useEffect, useState } from "react";
import { Navbar } from "../component/Navbar/Navbar";
import { Link, Route, Routes } from "react-router-dom";
import Home from "../component/Home/Home";
import JewelryDetail from "../component/Jewelry/JewelryDetail";
import Cart from "../component/Cart/Cart";
import Profile from "../component/Profile/Profile";
import BuyBack from "../component/BuyBack/BuyBack";
import StockGold from "../component/StockGold/StockGold";
import LoginForm from "../component/Auth/LoginForm";
import RegisterForm from "../component/Auth/RegisterForm";
import Guarantee from "../component/Guarantee/Guarantee";
import { PayMentSuccess } from "../PaymentSuccess/PayMentSuccess";
import ValuationA from "../component/BuyBack/ValuationA";
import Footer from "../component/Footer/Footer";
import Buy from "../component/BuyBack/Buy";
import Exchange from "../component/BuyBack/Exchange";
import Invoice from "../component/BuyBack/Invoice";
import { useSelector } from "react-redux";
import CreateAreaForm from "../ManagerComponent/CreateAreaForm/CreateAreaForm";
import InvoiceOut from "../component/BuyBack/InvoiceOut";

export const CustomerRoute = () => {
  const { area } = useSelector((store) => store);

  return (
    <div>

      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/area/:title/:id' element={area.userArea ? <JewelryDetail /> : <CreateAreaForm />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/my-profile/*' element={<Profile />} />
        <Route path='/buyback' element={<BuyBack />} />
        <Route path='/valuation/in' element={<ValuationA />} />
        <Route path='/stockgold' element={<StockGold />} />
        <Route path='/guarantee' element={<Guarantee />} />
        <Route path='/buy' element={<Buy />} />
        <Route path='/exchange' element={<Exchange />} />
        <Route path='/payment/success/:orderId' element={<PayMentSuccess />} />
        <Route path='/buyback-success/:buyBackId' element={<Invoice/>} />
        <Route path='/buyback-out-success/:buyBackId' element={<InvoiceOut/>} />
      </Routes>
    </div>
  );
}
