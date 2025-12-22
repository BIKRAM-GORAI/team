import React from 'react';

const BidCard = ({ bid }) => {
  return (
    <div>
      <h2>{bid.amount}</h2>
      <p>{bid.details}</p>
    </div>
  );
};

export default BidCard;
