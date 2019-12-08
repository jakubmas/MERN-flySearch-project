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
    <div className="result--content">
      <img src={imgSrc} alt={imgAlt} className="result--content__image" />

      <div className="result--content__container">
        <div className="result--content__container--from">
          <div className="from--container--departureName">
            <h4>From:</h4>
            <p>{departureName}</p>
          </div>
          <div className="from--container--departureDate">
            <h4>Departure: </h4>
            <p>{departureDate}</p>
          </div>
        </div>
        <div className="result--content__container--duration">
          <span>Duration:</span>
          <p>{duration}</p>
        </div>
        <div className="result--content__container--to">
          <div className="to--container--departureName">
            <h4>To:</h4>
            <p>{destination}</p>
          </div>
          <div className="to--container--departureDate">
            <h4>Departure: </h4>
            <p>{arrivalDate}</p>
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
