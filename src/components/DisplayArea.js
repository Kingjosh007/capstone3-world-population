import React from 'react';
import PropTypes from 'prop-types';

const DisplayArea = (props) => {
  const {
    type, title, elements,
  } = props;

  const containerClass = `${type}-countainer`;

  return (
    <div className="display-area">
      <div className="display-header primary-2">
        <h3 className="text-2">{title}</h3>
        <Filter type={type} />
      </div>
      <div className={containerClass} />

      </div>
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
