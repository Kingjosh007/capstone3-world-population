import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DisplayCard from './DisplayCard';

const DisplayArea = (props) => {
  const {
    type, title,
  } = props;

  const elements = useSelector((state) => state.countriesReducer.countries);

  const containerClass = `${type}-countainer`;
  const cardClass = type === 'countries' ? 'country' : 'city';

  return (
    <div className="display-area">
      <div className="display-header primary-2">
        <h3 className="text-2">{title}</h3>
      </div>
      <div className={containerClass} />

      { type === 'countries'
        ? elements.map((element) => (
          <Link to={`/details/${element.iso3}`} key={element.iso3}>
            <DisplayCard
              key={element.iso3}
              type={type}
              className={cardClass}
              element={element}
            />
          </Link>
        ))
        : elements.map((element) => (
          <DisplayCard
            key={element.iso3}
            type={type}
            className={cardClass}
            element={element}
          />
        ))}

    </div>
  );
};

DisplayArea.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
};

DisplayArea.defaultProps = {
  type: 'countries',
  title: 'Pop. by country',
};

export default DisplayArea;
