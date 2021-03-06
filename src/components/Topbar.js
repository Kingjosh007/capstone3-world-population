import React from 'react';
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaMicrophone, FaCog } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Topbar = (props) => {
  const { title } = props;

  return (
    <nav className="topbar primary-3">
      <div>
        <Link to="/" className="text-1">
          <FaAngleLeft />
        </Link>
      </div>
      <div>
        <h5 className="main-title text-2">{title}</h5>
      </div>
      <div className="icons-right">
        <FaMicrophone className="text-1" />
        <FaCog className="text-1" />
      </div>
    </nav>
  );
};

Topbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Topbar;
