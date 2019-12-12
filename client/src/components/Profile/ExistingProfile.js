import React from "react";
import PropTypes from "prop-types";
import Card from "../Card";
import laptop from "../../img/image-laptop.png";
import ticket from "../../img/image-ticket.png";
import plane from "../../img/logo.png";
const ExistingProfile = props => {
  return (
    <section className="section-about">
      <h2 className="heading-secondary u-margin--bottom-big">Profile</h2>
      <div
        className="about-content--container"
        style={{justifyContent: "space-evenly"}}
      >
        <div className="onboarding-box--container--profile">
          <Card
            image={laptop}
            heading="Set up your profile"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus in nostrum, voluptates eius omnis modi qui aliquam
            cumque aperiam?"
            linkTo="/edit-profile"
            buttonLabel="Edit"
          />
        </div>
        <div className="onboarding-box--container--profile">
          <Card
            image={plane}
            heading="Search Flights"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus in nostrum, voluptates eius omnis modi qui aliquam
            cumque aperiam?"
            linkTo="/search-flights"
            buttonLabel="Search Flights"
          />
        </div>
        <div className="onboarding-box--container--profile">
          <Card
            image={ticket}
            heading="Manage tickets"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus in nostrum, voluptates eius omnis modi qui aliquam
            cumque aperiam?"
            linkTo="/tickets"
            buttonLabel="Manage tickets"
          />
        </div>
      </div>
    </section>
  );
};

ExistingProfile.propTypes = {};

export default ExistingProfile;
