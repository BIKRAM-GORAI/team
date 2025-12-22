import React from 'react';

const ReviewCard = ({ review }) => {
  return (
    <div>
      <h2>{review.rating}</h2>
      <p>{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
