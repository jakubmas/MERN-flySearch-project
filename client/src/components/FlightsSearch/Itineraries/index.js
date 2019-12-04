import React, {Component} from "react";
import uuid from "uuid";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";
import ResultBlock from "../ResultBlock";

export default class Itineraries extends Component {
  state = {
    popup: false,
  };

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

  getPlace = (type, val) => {
    const {
      places,
      originOutbound,
      originInbound,
      destinationInbound,
      destinationOutbound,
    } = this.props;

    switch (type) {
      case "originInbound":
        return places.filter(place => place.Id === originInbound);
      case "destinationInbound":
        return places.filter(place => place.Id === destinationInbound);
      case "originOutbound":
        return places.filter(place => place.Id === originOutbound);
      case "destinationOutbound":
        return places.filter(place => place.Id === destinationOutbound);
      case "originStation":
        return places.filter(place => place.Id === val);
      case "destinationStation":
        return places.filter(place => place.Id === val);
    }
  };

  calculateDuration = num => {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return hours + ":" + minutes;
  };

  getAgentImg = () => {
    const {agents, linkToPayments} = this.props;
    return agents.filter(
      agent =>
        agent.Id ===
        linkToPayments.map(agentId => agentId.Agents.map(el => el)[0])[0],
    )[0].ImageUrl;
  };

  getSegments = type => {
    const {segmentIdsOutbound, segmentIdsInbound, segments} = this.props;
    switch (type) {
      case "outbound":
        return segmentIdsOutbound.map(index => segments[index]);
      case "inbound":
        return segmentIdsInbound.map(index => segments[index]);
    }
  };
  render() {
    const {
      linkToPayments,
      arrivalOutbound,
      departureOutbound,
      durationOutbound,
      arrivalInbound,
      departureInbound,
      durationInbound,
      currencies,
      segmentIdsOutbound,
      segmentIdsInbound,
    } = this.props;
    return (
      <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
        <ResultBlock
          imgSrc={this.getCarrierImg(0, "outbound")[0].ImageUrl}
          imgAlt={this.getCarrierImg(0, "outbound")[0].Name}
          departureName={this.getPlace("originOutbound")[0].Name}
          departureDate={departureOutbound}
          duration={this.calculateDuration(durationOutbound)}
          destination={this.getPlace("destinationOutbound")[0].Name}
          arrivalDate={arrivalOutbound}
        />

        {segmentIdsOutbound.length > 0 && (
          <Popup trigger={<button> Details</button>} position="right center">
            <div>
              <p>{segmentIdsOutbound.length} stops</p>
              {this.getSegments("outbound").map(el => {
                return (
                  <div key={uuid.v4()}>
                    <h5>
                      stop:
                      {this.getPlace("originStation", el.OriginStation)[0].Name}
                    </h5>
                    <p>Arrival {el.ArrivalDateTime}</p>
                    <p>Departure {el.DepartureDateTime}</p>
                  </div>
                );
              })}
            </div>
          </Popup>
        )}

        <ResultBlock
          imgSrc={this.getCarrierImg(0, "inbound")[0].ImageUrl}
          imgAlt={this.getCarrierImg(0, "inbound")[0].Name}
          departureName={this.getPlace("originInbound")[0].Name}
          departureDate={departureInbound}
          duration={this.calculateDuration(durationInbound)}
          destination={this.getPlace("destinationInbound")[0].Name}
          arrivalDate={arrivalInbound}
        />

        {segmentIdsOutbound.length > 0 && (
          <Popup trigger={<button> Details</button>} position="right center">
            <div>
              <p>{segmentIdsInbound.length} stops</p>
              {this.getSegments("inbound").map(el => {
                return (
                  <div key={uuid.v4()}>
                    <h5>
                      stop:
                      {this.getPlace("originStation", el.OriginStation)[0].Name}
                    </h5>
                    <p>Arrival {el.ArrivalDateTime}</p>
                    <p>Departure {el.DepartureDateTime}</p>
                  </div>
                );
              })}
            </div>
          </Popup>
        )}

        <div className="payment">
          <p>Price:{linkToPayments[0].Price}</p>
          <Popup trigger={<button> Pay</button>} position="left center">
            <div>
              {linkToPayments.map(link => {
                return (
                  <div key={uuid.v4()}>
                    <img src={this.getAgentImg()} alt="" />
                    <p>
                      price: {link.Price} {currencies[0].Symbol}
                    </p>
                    <button>
                      <a href={link.DeeplinkUrl}>Pay</a>
                    </button>
                  </div>
                );
              })}
            </div>
          </Popup>
        </div>
      </div>
    );
  }
}