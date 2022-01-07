import React from 'react';
import PropTypes from 'prop-types';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';

const DisplayCard = (props) => {
  const { type, className, element } = props;
  const altText = `Flag or area of ${element.name}`;

  if (type === 'countries') {
    return (
      <div className={className}>
        <div className="country-card-image">
          <img src={element.flag} alt={altText} />
        </div>
        <div className="country-card-content">
          <div className="country-card-name">{element.name}</div>
          <div className="country-card-pop">{element.latestPop}</div>
          <div className="country-card-year">
            (
            {element.latestPopYear}
            )
          </div>
        </div>
        <div className="arrow-icon">
          <FaRegArrowAltCircleRight />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="city-card-name">{element.name}</div>
      <div className="city-card-details">
        <div className="city-card-pop">{element.latestPop}</div>
        <div className="city-card-year">
          (
          {element.latestPopYear}
          )
        </div>
        <div className="arrow-icon">
          <FaRegArrowAltCircleRight />
        </div>
      </div>
    </div>
  );
};

DisplayCard.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  element: PropTypes.shape({
    name: PropTypes.string,
    latestPop: PropTypes.string,
    latestPopYear: PropTypes.number,
    flag: PropTypes.string,
  }),
};

DisplayCard.defaultProps = {
  className: 'countries',
  element: {
    name: 'Fetching...',
    latestPop: 'Unknown',
    latestPopYear: 2022,
    flag: '',
  },
};

export default DisplayCard;
