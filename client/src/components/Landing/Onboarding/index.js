import React from "react";
import PropTypes from "prop-types";

import ticketImage from "../../../img/image-ticket.png";
import travelerImage from "../../../img/image-traveler.png";
import laptopImage from "../../../img/image-laptop.png";
import worldImage from "../../../img/logo.png";

const Onboarding = props => {
  return (
    <section className="section-onboarding">
      <div className="onboarding-box--container">
        <div className="onboarding-box--card">
          <img
            src={laptopImage}
            alt="logo"
            className="header__logo card__icon"
          />
          <h3 className="heading-tertiary u-margin--bottom-small card--header">
            Create Account
          </h3>
          <p className="onboarding-box__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus in nostrum, voluptates eius omnis modi qui aliquam
            cumque aperiam?{" "}
          </p>
        </div>
        <div className="onboarding-box--card">
          <img
            src={ticketImage}
            alt="logo"
            className="header__logo card__icon"
          />
          <h3 className="heading-tertiary u-margin--bottom-small card--header">
            Save offers
          </h3>
          <p className="onboarding-box__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus in nostrum, voluptates eius omnis modi qui aliquam
            cumque aperiam?{" "}
          </p>
        </div>
        <div className="onboarding-box--card">
          <img
            src={travelerImage}
            alt="logo"
            className="header__logo card__icon"
          />
          <h3 className="heading-tertiary u-margin--bottom-small card--header">
            Buy tickets
          </h3>
          <p className="onboarding-box__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus in nostrum, voluptates eius omnis modi qui aliquam
            cumque aperiam?{" "}
          </p>
        </div>
        <div className="onboarding-box--card">
          <img
            src={worldImage}
            alt="logo"
            className="header__logo card__icon"
          />
          <h3 className="heading-tertiary u-margin--bottom-small card--header">
            Travel
          </h3>
          <p className="onboarding-box__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus in nostrum, voluptates eius omnis modi qui aliquam
            cumque aperiam?{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

Onboarding.propTypes = {};

export default Onboarding;
