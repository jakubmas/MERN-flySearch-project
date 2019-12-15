import React, {useEffect} from "react";
import PropTypes from "prop-types";
import uuid from "uuid";
import Popup from "reactjs-popup";
import ResultBlock from "../FlightsSearch/ResultBlock";
import Alert from "../Alert";

import {connect} from "react-redux";
import {
  deleteFlight,
  getCurrentFlightProfile,
} from "../../redux/actions/tickets";

const Tickets = ({
  getCurrentFlightProfile,
  deleteFlight,
  tickets: {flights, loading},
}) => {
  useEffect(() => {
    getCurrentFlightProfile();
  }, [getCurrentFlightProfile]);

  return !loading && flights === null ? (
    <h1>loader</h1>
  ) : flights.length > 0 ? (
    <div className="search-box--container">
      <h1 className="heading-primary your-flights">Your Flights:</h1>
      <div className="alert--container">
        <Alert />
      </div>
      {flights.map(flight => {
        return (
          <div className="result--container" key={flight._id}>
            <div className="contnent-and-button--container">
              <ResultBlock
                imgSrc={flight.outobundCarriageLogo}
                imgAlt={flight.outboundCarriageName}
                departureName={flight.outboundDeparturePlace}
                departureDate={flight.outboundDepartureDate}
                duration={flight.outboundDuration}
                destination={flight.outboundDestinationPlace}
                arrivalDate={flight.outboundArrivalDate}
              />
            </div>
            <div className="contnent-and-button--container">
              <ResultBlock
                imgSrc={flight.inboundCarriageLogo}
                imgAlt={flight.inboundCarriageName}
                departureName={flight.inboundDeparturePlace}
                departureDate={flight.inboundDepartureDate}
                duration={flight.inboundDuration}
                destination={flight.inboundDestinationPlace}
                arrivalDate={flight.inboundArrivalDate}
              />
            </div>
            <div className="payment">
              <Popup
                trigger={<button className="btn--small"> Pay </button>}
                position="bottom"
              >
                <div>
                  {flight.payments.map(link => {
                    return (
                      <div key={uuid.v4()}>
                        <p>price: {link.Price} €</p>
                        <button className="btn--small">
                          <a href={link.DeeplinkUrl}>Pay</a>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </Popup>
              <button
                onClick={() => deleteFlight(flight._id)}
                className="btn--small"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <h3 className="heading-tertiary u-margin--bottom-small">
      seems like you don't have any flights! Go and add some!
    </h3>
  );
};

Tickets.propTypes = {
  getCurrentFlightProfile: PropTypes.func.isRequired,
  deleteFlight: PropTypes.func.isRequired,
  tickets: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  tickets: state.tickets,
});

export default connect(mapStateToProps, {
  getCurrentFlightProfile,
  deleteFlight,
})(Tickets);
