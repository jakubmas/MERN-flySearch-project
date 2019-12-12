import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const Card = ({image, heading, content, linkTo, buttonLabel}) => {
  return (
    <div className="onboarding-box--card">
      <img src={image} alt="logo" className="header__logo card__icon" />
      <h3 className="heading-tertiary u-margin--bottom-small card--header">
        {heading}
      </h3>
      <p className="onboarding-box__text">{content}</p>
      {linkTo && (
        <Link to={linkTo} className="btn--small btn--small__margin">
          {buttonLabel}
        </Link>
      )}
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  linkTo: PropTypes.string,
  buttonLabel: PropTypes.string,
};

export default Card;
