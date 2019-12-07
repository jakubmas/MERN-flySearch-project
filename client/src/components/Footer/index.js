import React from "react";
import PropTypes from "prop-types";

import mainLogo from "../../img/logo-black.png";

const Footer = props => {
  return (
    <footer className="footer">
      <div className="footer__logo-box">
        <img src={mainLogo} alt="mainlogo" className="footer__logo" />
      </div>
      <div className="footer__content-container">
        <div className="footer__navigation">
          <ul className="footer__list">
            <li className="footer__item">
              <a href="#" className="footer__link">
                Home
              </a>
            </li>
            <li className="footer__item">
              <a href="#" className="footer__link">
                Create Account
              </a>
            </li>
            <li className="footer__item">
              <a href="#" className="footer__link">
                About us
              </a>
            </li>
            <li className="footer__item">
              <a href="#" className="footer__link">
                Contact us
              </a>
            </li>
          </ul>
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

Footer.propTypes = {};

export default Footer;
