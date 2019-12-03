import React from "react";
import PropTypes from "prop-types";

const ResultBlock = props => {
  const {
    imgSrc,
    imgAlt,
    departureName,
    departureDate,
    duration,
    destination,
    arrivalDate,
  } = props;
  return (
    <div>
      <div>
        <img src={imgSrc} alt={imgAlt} />
      </div>
      <div>
        <div style={{display: "flex", flexDirection: "row"}}>
          <div>
            <h4>From:</h4>
            <p>{departureName}</p>
            <p>Departure: {departureDate}</p>
          </div>
          <div>
            <p>{duration}</p>
          </div>
          <div>
            <h4>To:</h4>
            <p>{destination}</p>
            <p>Departure: {arrivalDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

ResultBlock.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  departureName: PropTypes.string.isRequired,
  departureDate: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  arrivalDate: PropTypes.string.isRequired,
};

export default ResultBlock;
