import React, { useEffect } from 'react'
import  EventCard  from './EventCard'
import { useDispatch, useSelector } from 'react-redux';
import { getCoupons } from '../State/Event/Action';
export const Events=()=> {
  const dispatch = useDispatch();
  const coupon = useSelector(state => state.coupon);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    // Dispatch action để lấy danh sách coupons khi component được render
    dispatch(getCoupons(jwt)); // Thay 'your_jwt_token_here' bằng JWT token của bạn
  }, [dispatch]);

  return (
    <div className='mt-5 px-5 flex flex-wrap gap-5'>
    {coupon.coupons.map(coupon => (
      <EventCard key={coupon.id} coupon={coupon} />
    ))}
    </div>
  )
}
