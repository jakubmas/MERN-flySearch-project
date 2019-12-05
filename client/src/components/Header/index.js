import React from "react";
import PropTypes from "prop-types";
import mainLogo from "../../img/logo.png";
const Header = props => {
  return (
    <header className="header">
      <div className="header__logo-box">
        <img src={mainLogo} alt="logo" className="header__logo" />
      </div>
      <div className="header__text-box">
        <h1 className="heading-primary">
          <span className="heading-primary--main">FlyHigh</span>
          <span className="heading-primary--sub">Where do you want to go?</span>
        </h1>

        <a href="#" className="btn btn--white btn--animated">
          See our offers
        </a>
      </div>
    </header>
  );
};

Header.propTypes = {};

export default Header;
