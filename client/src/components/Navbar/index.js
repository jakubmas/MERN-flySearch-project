import React, {useState} from "react";
import PropTypes from "prop-types";

const Navbar = props => {
  const [formData, setFormData] = useState({
    toggleNavigation: false,
  });

  const {toggleNavigation} = formData;

  const toggleNavigtionHandler = () => {
    setFormData({toggleNavigation: !toggleNavigation});
    console.log("this.state", toggleNavigation);
  };
  return (
    <div className={toggleNavigation ? "navigation" : ""}>
      <button
        className="navigation__button"
        onClick={() => toggleNavigtionHandler()}
      >
        Menu
      </button>
      <nav className={toggleNavigation ? "navigation__nav" : ""}>
        {toggleNavigation ? (
          <ul className="navigation__list">
            <li className="navigation__item">
              <a href="#" className="navigation__link">
                About
              </a>
            </li>
            <li className="navigation__item">
              <a href="#" className="navigation__link">
                FlightBrowser
              </a>
            </li>
            <li className="navigation__item">
              <a href="#" className="navigation__link">
                Register
              </a>
            </li>
            <li className="navigation__item">
              <a href="#" className="navigation__link">
                Your profile
              </a>
            </li>
            <li className="navigation__item">
              <a href="#" className="navigation__link">
                Login
              </a>
            </li>
            <li className="navigation__item">
              <a href="#" className="navigation__link">
                Logout
              </a>
            </li>
          </ul>
        ) : (
          ""
        )}
      </nav>
    </div>
    // <div className="navigation">
    //   <input
    //     type="checkbox"
    //     className="navigation__checkbox"
    //     id="navi-toggle"
    //   />
    //   <label htmlFor="navi-toggle" className="navigation__button">
    //     Menu
    //   </label>
    //   <div className="navigation__background">&nbsp;</div>
    //   <nav className="navigation__nav">
    //     <ul className="navigation__list">
    //       <li className="navigation__item">
    //         <a href="#" className="navigation__link">
    //           About
    //         </a>
    //       </li>
    //       <li className="navigation__item">
    //         <a href="#" className="navigation__link">
    //           FlightBrowser
    //         </a>
    //       </li>
    //       <li className="navigation__item">
    //         <a href="#" className="navigation__link">
    //           Register
    //         </a>
    //       </li>
    //       <li className="navigation__item">
    //         <a href="#" className="navigation__link">
    //           Your profile
    //         </a>
    //       </li>
    //       <li className="navigation__item">
    //         <a href="#" className="navigation__link">
    //           Login
    //         </a>
    //       </li>
    //       <li className="navigation__item">
    //         <a href="#" className="navigation__link">
    //           Logout
    //         </a>
    //       </li>
    //     </ul>
    //   </nav>
    // </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
