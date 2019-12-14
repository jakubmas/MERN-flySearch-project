import React, {Component} from "react";
import {connect} from "react-redux";
import uuid from "uuid";
import Popup from "reactjs-popup";
import axios from "axios";
import PropTypes from "prop-types";
import {setAlert} from "../../../redux/actions/alert";
import ResultBlock from "../ResultBlock";

class Itineraries extends Component {
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

  addTicket = async () => {
    const {
      departureOutbound,
      durationOutbound,
      arrivalOutbound,
      departureInbound,
      durationInbound,
      arrivalInbound,
      linkToPayments,
      setAlert,
    } = this.props;

    const outobundCarriageLogo = this.getCarrierImg(0, "outbound")[0].ImageUrl;
    const outboundCarriageName = this.getCarrierImg(0, "outbound")[0].Name;
    const outboundDeparturePlace = this.getPlace("originOutbound")[0].Name;
    const outboundDepartureDate = departureOutbound;
    const outboundDuration = this.calculateDuration(durationOutbound);
    const outboundDestinationPlace = this.getPlace("destinationOutbound")[0]
      .Name;
    const outboundArrivalDate = arrivalOutbound;
    const inboundCarriageLogo = this.getCarrierImg(0, "inbound")[0].ImageUrl;
    const inboundCarriageName = this.getCarrierImg(0, "inbound")[0].Name;
    const inboundDeparturePlace = this.getPlace("originInbound")[0].Name;
    const inboundDepartureDate = departureInbound;
    const inboundDuration = this.calculateDuration(durationInbound);
    const inboundDestinationPlace = this.getPlace("destinationInbound")[0].Name;
    const inboundArrivalDate = arrivalInbound;
    const payments = linkToPayments;

    const body = JSON.stringify({
      outobundCarriageLogo,
      outboundCarriageName,
      outboundDeparturePlace,
      outboundDepartureDate,
      outboundDuration,
      outboundDestinationPlace,
      outboundArrivalDate,
      inboundCarriageLogo,
      inboundCarriageName,
      inboundDeparturePlace,
      inboundDepartureDate,
      inboundDuration,
      inboundDestinationPlace,
      inboundArrivalDate,
      payments,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("api/ticket", body, config);

    if (res.data === "Ticket saved") {
      setAlert(res.data, "success", 3000);
    }
    if (res.data !== "Ticket saved") {
      setAlert(res.data, "danger", 3000);
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
      <div className="result--container">
        <div className="contnent-and-button--container">
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
            <Popup
              trigger={
                <button className="btn--small btn--small--alignSelf">
                  Details
                </button>
              }
              position="bottom"
            >
              <div>
                <p>{segmentIdsOutbound.length} stops</p>
                {this.getSegments("outbound").map(el => {
                  return (
                    <div key={uuid.v4()}>
                      <h5>
                        stop:
                        {
                          this.getPlace("originStation", el.OriginStation)[0]
                            .Name
                        }
                      </h5>
                      <p>Arrival {el.ArrivalDateTime}</p>
                      <p>Departure {el.DepartureDateTime}</p>
                    </div>
                  );
                })}
              </div>
            </Popup>
          )}
        </div>
        <div className="contnent-and-button--container">
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
            <Popup
              trigger={
                <button className="btn--small btn--small--alignSelf">
                  Details
                </button>
              }
              position="bottom"
            >
              <div>
                <p>{segmentIdsInbound.length} stops</p>
                {this.getSegments("inbound").map(el => {
                  return (
                    <div key={uuid.v4()}>
                      <h5>
                        stop:
                        {
                          this.getPlace("originStation", el.OriginStation)[0]
                            .Name
                        }
                      </h5>
                      <p>Arrival {el.ArrivalDateTime}</p>
                      <p>Departure {el.DepartureDateTime}</p>
                    </div>
                  );
                })}
              </div>
            </Popup>
          )}
        </div>
        <div className="payment">
          <p>Price: {linkToPayments[0].Price} &euro;</p>
          <Popup
            trigger={<button className="btn--small"> Pay </button>}
            position="bottom"
          >
            <div>
              {linkToPayments.map(link => {
                return (
                  <div key={uuid.v4()}>
                    <img src={this.getAgentImg()} alt="" />
                    <p>
                      price: {link.Price} {currencies[0].Symbol}
                    </p>
                    <button className="btn--small">
                      <a href={link.DeeplinkUrl}>Pay</a>
                    </button>
                  </div>
                );
              })}
            </div>
          </Popup>
          <button className="btn--small" onClick={this.addTicket}>
            Add
          </button>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = {
  setAlert,
};

export default connect(null, mapDispatchToProps)(Itineraries);
