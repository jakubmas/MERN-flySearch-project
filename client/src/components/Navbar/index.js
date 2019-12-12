import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../redux/actions/auth";
import PropTypes from "prop-types";

const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {
  const [formData, setFormData] = useState({
    toggleNavigation: false,
  });

  const {toggleNavigation} = formData;

  const toggleNavigtionHandler = () => {
    setFormData({toggleNavigation: !toggleNavigation});
  };

  const authLinks = (
    <ul className="navigation__list">
      <li className="navigation__item">
        <Link to="/" className="navigation__link">
          Home
        </Link>
      </li>
      <li className="navigation__item">
        <Link to="/search-flights" className="navigation__link">
          FlightBrowser
        </Link>
      </li>
      <li className="navigation__item">
        <Link to="/profile" className="navigation__link">
          Your profile
        </Link>
      </li>
      <li className="navigation__item">
        <a onClick={logout} href="" className="navigation__link">
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navigation__list">
      <li className="navigation__item">
        <Link to="/" className="navigation__link">
          Home
        </Link>
      </li>
      <li className="navigation__item">
        <Link to="/register" className="navigation__link">
          Register
        </Link>
      </li>
      <li className="navigation__item">
        <Link to="/login" className="navigation__link">
          Login
        </Link>
      </li>
    </ul>
  );
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
          {/* {!loading && ( */}
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          {/* )} */}
        </nav>
      ) : null}
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logout})(Navbar);
