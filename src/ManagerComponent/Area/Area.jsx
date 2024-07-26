import React, { useEffect, useState, useRef } from "react";
import JewelryCard from '../../component/Jewelry/JewelryCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAreaAction } from "../../component/State/Area/Action";

const Area = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { area } = useSelector(store => store);

    useEffect(() => {
        if (jwt) {
            dispatch(getAllAreaAction(jwt));
        }
    }, [dispatch, jwt]);

    return (
        <div >
            <section id="order-here" className="px-5 lg:px-20 pt-5" >
                <p className="order-here-section"  style={{ backgroundColor: '#0B4CBB',  color: 'white'}}>Area</p>
                <div className="flex flex-wrap items-center justify-around gap-5">
                    {area?.areas?.length > 0 ? area.areas.map((item, index) => (
                        <JewelryCard key={index} item={item} />
                    )) : (
                        <p>No Area available</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Area;
