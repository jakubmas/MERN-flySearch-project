import React from "react";

import ticketImage from "../../../img/image-ticket.png";
import travelerImage from "../../../img/image-traveler.png";
import laptopImage from "../../../img/image-laptop.png";
import worldImage from "../../../img/logo.png";

import Card from "../../Card";

const Onboarding = () => {
  return (
    <section className="section-onboarding">
      <div className="onboarding-box--container">
        <Card
          image={laptopImage}
          heading="Create Account"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus in nostrum, voluptates eius omnis modi qui aliquam
            cumque aperiam?"
        />
        <Card
          image={ticketImage}
          heading="Buy tickets"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus in nostrum, voluptates eius omnis modi qui aliquam
            cumque aperiam?"
        />
        <Card
          image={travelerImage}
          heading="Create Account"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus in nostrum, voluptates eius omnis modi qui aliquam
            cumque aperiam?"
        />
        <Card
          image={worldImage}
          heading="Travel"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus in nostrum, voluptates eius omnis modi qui aliquam
            cumque aperiam?"
        />
      </div>
    </section>
  );
};

export default Onboarding;
