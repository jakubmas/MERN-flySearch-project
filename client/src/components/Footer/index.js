import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import mainLogo from "../../img/logo.png";

const Footer = ({auth: {isAuthenticated, loading}}) => {
  const authLinks = (
    <ul className="footer__list">
      <li className="footer__item">
        <Link to="/" className="footer__link">
          Home
        </Link>
      </li>
      <li className="footer__item">
        <Link to="/profile" className="footer__link">
          Your profile
        </Link>
      </li>
      <li className="footer__item">
        <Link to="/search-flights" className="footer__link">
          FlightBrowser
        </Link>
      </li>
      <li className="footer__item">
        <Link to="/tickets" className="footer__link">
          Your tickets
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="footer__list">
      <li className="footer__item">
        <Link to="/" className="footer__link">
          Home
        </Link>
      </li>
      <li className="footer__item">
        <Link to="/register" className="footer__link">
          Register
        </Link>
      </li>
      <li className="footer__item">
        <Link to="/login" className="footer__link">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <footer className="footer">
      <div className="footer__logo-box">
        <img src={mainLogo} alt="mainlogo" className="footer__logo" />
      </div>
      <div className="footer__content-container">
        <div className="footer__navigation">
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        </div>
        <div className="footer__copyright">
          <p className="footer__copyright-text">
            Built by{" "}
            <a href="https://github.com/jakubmas" className="footer__link">
              him
            </a>{" "}
            for presentational purposes
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Footer);
