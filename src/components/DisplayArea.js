import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DisplayCard from './DisplayCard';

const DisplayArea = (props) => {
  const {
    type, title, elements,
  } = props;

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
          <Link to={`/details/${element.iso3}`} key={element.iso3} />
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
  elements: PropTypes.arrayOf(PropTypes.object),
};

DisplayArea.defaultProps = {
  type: 'countries',
  title: 'Pop. by country',
  elements: [],
};

export default DisplayArea;
