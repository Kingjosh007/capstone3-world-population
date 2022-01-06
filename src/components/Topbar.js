import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaAngleLeft, FaMicrophone, FaCog } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Topbar = (props) => {
  const { title } = props;

  return (
    <nav className="topbar primary4">
      <div>
        <NavLink to="/" className="text1">
          <FaAngleLeft />
        </NavLink>
      </div>
      <div>
        <h5 className="text2">{title}</h5>
      </div>
      <div className="icons-right">
        <FaMicrophone className="text1" />
        <FaCog className="text1" />
      </div>
    </nav>
  );
};

Topbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Topbar;
