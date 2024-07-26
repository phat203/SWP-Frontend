import React from 'react';

const Show = ({ coupon, onClick }) => {
  return (
    <div>
      <img src={coupon.imageUrl} alt={coupon.title} onClick={() => onClick(coupon.id)} />
      <h2>{coupon.title}</h2>
      <p>{coupon.description}</p>
    </div>
  );
};

export default Show;
