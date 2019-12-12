import React from "react";
import PropTypes from "prop-types";
import Card from "../Card";
import laptop from "../../img/image-laptop.png";

const NewProfile = props => {
  return (
    <section className="section-about">
      <div
        className="about-content--container"
        style={{justifyContent: "space-evenly"}}
      >
        <div className="about-content--text-wrapper">
          <h3 className="heading-tertiary u-margin--bottom-small">
            Browse through thousands flights to get best offers!
          </h3>
          <p className="paragraph">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia et
            iure voluptate expedita cum sunt laudantium ab ut tenetur voluptas
            totam exercitationem vero iusto, quas aliquam hic nisi sint
            doloremque.
          </p>
          <h3 className="heading-tertiary u-margin--bottom-small">
            Save offers that you like to buy them later
          </h3>
          <p className="paragraph">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia et
            iure voluptate expedita cum sunt laudantium ab ut tenetur voluptas
            totam exercitationem vero iusto, quas aliquam hic nisi sint
            doloremque.
          </p>
        </div>
        <div className="onboarding-box--container--profile">
          <Card
            image={laptop}
            heading="Set up your profile"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus in nostrum, voluptates eius omnis modi qui aliquam
            cumque aperiam?"
            linkTo="/create-profile"
            buttonLabel="Create Profile"
          />
        </div>
      </div>
    </section>
  );
};

NewProfile.propTypes = {};

export default NewProfile;
