import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="navBar">
    <ul>
      <li key={1}>
        <NavLink to="/" className={(navData) => (navData.isActive ? 'active-link' : '')}>
          Rocket
        </NavLink>
      </li>
      <li key={2}>
        <NavLink to="/Mission" className={(navData) => (navData.isActive ? 'active-link' : '')}>
          Mission
        </NavLink>
      </li>
      <li key={3}>
        <NavLink to="/Myprofile" className={(navData) => (navData.isActive ? 'active-link' : '')}>
          My Profile
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navbar;
