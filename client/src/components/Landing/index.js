import React from "react";
import Header from "../Header";
import About from "./About";
import Onboarding from "./Onboarding";
import Footer from "../Footer";
const Landing = props => {
  return (
    <div>
      <Header subtitle="Where do you want to go?" landing={true} />
      <About />
      <Onboarding />
      <Footer />
    </div>
  );
};

Landing.propTypes = {};

export default Landing;
