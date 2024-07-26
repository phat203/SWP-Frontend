import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoupons } from '../State/Event/Action';
import EventCard from './EventCard';

export const EventShow = () => {
  const dispatch = useDispatch();
  const coupon = useSelector(state => state.coupon);
  const jwt = localStorage.getItem("jwt");

  const [fadeIn, setFadeIn] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState(null);

  useEffect(() => {
    // Dispatch action to fetch coupons when the component is rendered
    dispatch(getCoupons(jwt));
  }, [dispatch, jwt]);

  useEffect(() => {
    if (coupon.coupons.length > 0) {
      setFadeIn(true);
    }
  }, [coupon.coupons]);

  // Function to get the two most recently created events
  const getRecentCoupons = (coupons) => {
    return coupons
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by created date in descending order
      .slice(0, 2); // Get the first two
  };

  const recentCoupons = getRecentCoupons(coupon.coupons);

  const fadeInStyle = {
    opacity: fadeIn ? 1 : 0,
    transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 500ms, transform 500ms'
  };

  const handleCouponClick = (id) => {
    setSelectedCouponId(id);
    console.log(`Coupon ID: ${id}`);
  };

  return (
    <div className='mt-5 px-5 flex flex-wrap gap-5'>
      {recentCoupons.map(coupon => (
        <div key={coupon.id} style={fadeInStyle} onClick={() => handleCouponClick(coupon.id)}>
          <EventCard coupon={coupon} />
        </div>
      ))}
    </div>
  );
};
