import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {Link, Redirect} from "react-router-dom";
import mainLogo from "../../img/logo.png";
const Header = ({subtitle, landing, profile}) => {
  return (
    <Fragment>
      <header className={profile ? "header--profile" : "header"}>
        <div className="header__logo-box">
          <img src={mainLogo} alt="logo" className="header__logo" />
        </div>
        <div className="header__container">
          <div className="header__text-box">
            <h1 className="heading-primary">
              <span className="heading-primary--main">FlyHigh</span>
              <span className="heading-primary--sub">{subtitle}</span>
            </h1>
            {landing && (
              <Link
                to="/search-flights"
                className="btn btn--white btn--animated"
              >
                See our offers
              </Link>
            )}
          </div>
        </div>
      </header>
    </Fragment>
  );
};

Header.propTypes = {};

export default Header;
