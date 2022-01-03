import React from 'react';
import PropTypes from 'prop-types';

const Rocket = (props) => {
  const {
    id, name, description, isBooked, handleBookRocket, handleUnbookRocket, images,
  } = props;

  return (
    <li className="single-rocket">
      <div className="rocket-image-container">
        <img src={images[0]} alt={name} />
      </div>
      <div className="rocket-info">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      {isBooked ? (<button type="button" onClick={() => handleUnbookRocket(id)}>Cancel Reservation</button>)
        : (<button type="button" onClick={() => handleBookRocket(id)}>Book Rocket</button>) }

    </li>
  );
};

Rocket.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isBooked: PropTypes.bool.isRequired,
  handleBookRocket: PropTypes.func.isRequired,
  handleUnbookRocket: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default Rocket;
