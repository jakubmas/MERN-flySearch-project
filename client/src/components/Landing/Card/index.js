import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
const Card = props => {
  return (
    <div className="container-card">
      <div className="card">
        <div className="card__side card__side--front">
          <div className="card__picture">&nbsp;</div>
          <div className="card__heading">
            <span className="card__heading-span">FlyHigh</span>
          </div>
          <div className="card__details">
            <ul>
              <li>Best offers</li>
              <li>Safe payment</li>
              <li>Free account</li>
              <li>Easy to use</li>
            </ul>
          </div>
        </div>
        <div className="card__side card__side--back">
          <div className="card__cta">
            <div className="card__register">
              <p className="card__register-title">Create Your Account</p>
              <div className="card__register-button">
                <Link to="/register" className="btn btn--white">
                  Register today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {};

export default Card;
