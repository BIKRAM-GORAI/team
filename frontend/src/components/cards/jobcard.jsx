import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
    </div>
  );
};

export default JobCard;
