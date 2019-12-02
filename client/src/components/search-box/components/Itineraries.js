import React, {Component} from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";

export default class Itineraries extends Component {
  static propTypes = {
    linkToPayments: PropTypes.array.isRequired,
    arrivalOutbound: PropTypes.string.isRequired,
    departureOutbound: PropTypes.string.isRequired,
    durationOutbound: PropTypes.number.isRequired,
    destinationOutbound: PropTypes.number.isRequired,
    originOutbound: PropTypes.number.isRequired,
    arrivalInbound: PropTypes.string.isRequired,
    departureInbound: PropTypes.string.isRequired,
    durationInbound: PropTypes.number.isRequired,
    destinationInbound: PropTypes.number.isRequired,
    originInbound: PropTypes.number.isRequired,
    carriers: PropTypes.array.isRequired,
    currencies: PropTypes.array.isRequired,
    places: PropTypes.array.isRequired,
    agents: PropTypes.array.isRequired,
    flightNumbersInbound: PropTypes.array.isRequired,
    flightNumbersOutbound: PropTypes.array.isRequired,
  };
  componentDidMount() {
    const {
      linkToPayments,
      arrivalOutbound,
      departureOutbound,
      durationOutbound,
      destinationOutbound,
      originOutbound,
      arrivalInbound,
      departureInbound,
      durationInbound,
      destinationInbound,
      originInbound,
      carriers,
      currencies,
      places,
      agents,
      flightNumbersInbound,
      flightNumbersOutbound,
    } = this.props;
    console.log("this.props ITINERARIES", this.props);
    //outbound wychodzący

    // flightNumbersOutbound.filter(flight =>
    //   console.log("eelkop", flight.CarrierId === agents.map(agent => agent.Id)),
    // );
    console.log(this.getCarrierImg(0, "inbound"));
  }

  getCarrierImg = (index, type) => {
    const {carriers, flightNumbersInbound, flightNumbersOutbound} = this.props;

    switch (type) {
      case "inbound":
        return carriers.filter(
          flight => flight.Id === flightNumbersInbound[index].CarrierId,
        );
      case "outbound":
        return carriers.filter(
          flight => flight.Id === flightNumbersOutbound[index].CarrierId,
        );
    }
  };

  getPlace = type => {
    const {
      places,
      originOutbound,
      originInbound,
      destinationInbound,
      destinationOutbound,
    } = this.props;
    console.log(
      "no i co?",
      places.filter(place => place.Id === originInbound),
    );

    switch (type) {
      case "originInbound":
        return places.filter(place => place.Id === originInbound);
      case "destinationInbound":
        return places.filter(place => place.Id === destinationInbound);
      case "originOutbound":
        return places.filter(place => place.Id === originOutbound);
      case "destinationOutbound":
        return places.filter(place => place.Id === destinationOutbound);
    }
  };

  calculateDuration = num => {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return hours + ":" + minutes;
  };

  popupHandler = () => {
    console.log("elko");
    return (
      <Popup trigger={<button> Trigger</button>} position="right center">
        <div>Popup content here !!</div>
      </Popup>
    );
  };

  render() {
    const {
      linkToPayments,
      arrivalOutbound,
      departureOutbound,
      durationOutbound,
      destinationOutbound,
      originOutbound,
      arrivalInbound,
      departureInbound,
      durationInbound,
      destinationInbound,
      originInbound,
      carriers,
      currencies,
      places,
      agents,
      flightNumbersInbound,
      flightNumbersOutbound,
    } = this.props;
    return (
      <div>
        <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
          <div>
            <img
              src={this.getCarrierImg(0, "inbound")[0].ImageUrl}
              alt={this.getCarrierImg(0, "inbound")[0].Name}
            />
          </div>
          <div className="container from to">
            <div style={{display: "flex", flexDirection: "row"}}>
              <div className="from">
                <h4>From:</h4>
                <p>{this.getPlace("originOutbound")[0].Name}</p>
                <p>Departure: {departureOutbound}</p>
              </div>
              <div className="durationOutbound">
                <p>{this.calculateDuration(durationOutbound)}</p>
              </div>
              <div className="to">
                <h4>To:</h4>
                <p>{this.getPlace("destinationOutbound")[0].Name}</p>
                <p>Departure: {arrivalOutbound}</p>
              </div>
            </div>
          </div>
          <div className="payment">
            <button onClick={() => this.popupHandler()}>Buy</button>
          </div>
        </div>
      </div>
    );
  }
}
