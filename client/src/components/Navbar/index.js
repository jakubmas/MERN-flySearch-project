import React, {Fragment, useState} from "react";
import PropTypes from "prop-types";

const Navbar = props => {
  const [formData, setFormData] = useState({
    toggleNavigation: false,
  });

  const {toggleNavigation} = formData;

  const toggleNavigtionHandler = () => {
    setFormData({toggleNavigation: !toggleNavigation});
  };
  return (
    <div className="navigation">
      <label
        htmlFor="navi-toggle"
        className="navigation__checkbox"
        onClick={toggleNavigtionHandler}
      >
        <span className="navigation__icon"></span>
      </label>
      <div className="navigation__background"></div>
      {toggleNavigation ? (
        <nav
          className={
            toggleNavigation ? "navigation__nav show" : "navigation__nav toggle"
          }
        >
          <ul className="navigation__list">
            <li className="navigation__item">
              <a href="#" className="navigation__link">
                About
              </a>
            </li>
            <li className="navigation__item">
              <a href="#" className="navigation__link">
                FlightBrowser
              </a>
            </li>
            <li className="navigation__item">
              <a href="#" className="navigation__link">
                Register
              </a>
            </li>
            <li className="navigation__item">
              <a href="#" className="navigation__link">
                Your profile
              </a>
            </li>
            <li className="navigation__item">
              <a href="#" className="navigation__link">
                Login
              </a>
            </li>
            <li className="navigation__item">
              <a href="#" className="navigation__link">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
