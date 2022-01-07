import React from 'react';
import PropTypes from 'prop-types';

const Hero = (props) => {
  const {
    region, population, year, imgLink,
  } = props;
  const altText = `Flag or area of ${region}`;

  return (
    <div className="hero primary-4">
      <div className="hero-image">
        <img src={imgLink} alt={altText} />
      </div>
      <div className="hero-content">
        <div className="hero-region">{region}</div>
        <div className="hero-pop">
          <div>
            <span className="hero-actual-pop">
              {population}
            </span>
            {' inhab.'}
          </div>
          <div className="hero-year">
            (
            {year}
            )
          </div>
        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {
  region: PropTypes.string,
  population: PropTypes.string,
  year: PropTypes.string,
  imgLink: PropTypes.string.isRequired,
};

Hero.defaultProps = {
  region: 'World',
  population: 'Unknown',
  year: '2018',
};

export default Hero;
