import React from 'react';
import PropTypes from 'prop-types';

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
        <Filter type={type} />
      </div>
      <div className={containerClass} />

            { type === 'countries' ? elements.map((element) => <DisplayCard key={element.name} type={type} className={cardClass} element={element} />)
                : elements.map((element) => <DisplayCard key={element.name} type={type} className={cardClass} element={element} />) }

  }
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
