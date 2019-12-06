import React from "react";
import Header from "../Header";
import About from "./About";
import Onboarding from "./Onboarding";

const Landing = props => {
  return (
    <div>
      <Header />
      <About />
      <Onboarding />
    </div>
  );
};

Landing.propTypes = {};

export default Landing;
