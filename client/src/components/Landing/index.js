import React from "react";
import Header from "../Header";
import About from "./About";
import Onboarding from "./Onboarding";
import Footer from "../Footer";
const Landing = props => {
  return (
    <div>
      <Header />
      <About />
      <Onboarding />
      <Footer />
    </div>
  );
};

Landing.propTypes = {};

export default Landing;
