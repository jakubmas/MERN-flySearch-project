import React from "react";

import FlippingCard from "../FlippingCard";

const About = props => {
  return (
    <div>
      <section className="section-about">
        <h2 className="heading-secondary u-margin--bottom-big">
          Discover places where you always wanted to go
        </h2>
        <div className="about-content--container">
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
          <FlippingCard />
        </div>
      </section>
    </div>
  );
};

export default About;
