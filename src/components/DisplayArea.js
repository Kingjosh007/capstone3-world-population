import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DisplayCard from './DisplayCard';
import Filter from './Filter';

const DisplayArea = (props) => {
  const {
    type, title, hint,
  } = props;

  const containerClass = `${type}-container`;
  const cardClass = type === 'countries' ? 'country' : 'city';
  let elements = [];

  if (type === 'countries') {
    elements = useSelector((state) => state.countriesReducer.displayedCountries);
  } else {
    const elts = useSelector((state) => state.countriesReducer.countryPopDetails);
    elements = elts.populationData || [];
  }

  return (
    <div className="display-area">
      <div className="display-header primary-3">
        <div className="display-header-left">
          <h3 className="text-2">{title}</h3>
          <div className="hint">{hint}</div>
        </div>
        { type === 'countries' ? (
          <div className="filter-input">
            <Filter />
          </div>
        ) : ''}
      </div>
      <div className={containerClass}>

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
    </div>
  );
};

DisplayArea.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  hint: PropTypes.string,
};

DisplayArea.defaultProps = {
  type: 'countries',
  title: 'Pop. by country',
  hint: '',
};

export default DisplayArea;
