import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {logout} from "../../../redux/actions/auth";
const FlippingCard = ({auth: {isAuthenticated, token}, logout}) => {
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
            {!isAuthenticated && !token ? (
              <div className="card__register">
                <p className="card__register-title">Create Your Account</p>
                <div className="card__register-button">
                  <Link to="/register" className="btn btn--white">
                    Register today
                  </Link>
                  <Link to="/login" className="btn btn--white">
                    Login
                  </Link>
                </div>
              </div>
            ) : (
              <div className="card__register">
                <p className="card__register-title">Logout</p>
                <div className="card__register-button">
                  <Link to="/" className="btn btn--white" onClick={logout}>
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

FlippingCard.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logout})(FlippingCard);
