import React from "react";
import PropTypes from "prop-types";
import Itineraries from "./Itineraries.js";
import uuid from "uuid";
class SearchResults extends React.Component {
  state = {
    loaded: false,
  };

  static propTypes = {
    results: PropTypes.object.isRequired,
  };

  componentDidMount() {
    console.log("this.props", this.props.results);
    this.setState({loaded: true});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.results !== this.props.results) {
      console.log("this.props", this.props.results);
      this.setState({loaded: true});
    }
  }

  renderItineraries = () => {
    const {travelData} = this.props.results;
    console.log("travelData", travelData);
    const getPriceAndLink = travelData.Itineraries.map(el => {
      return {
        price: el.PricingOptions[0].Price,
        paymentLink: el.PricingOptions[0].DeeplinkUrl,
        idOutbound: el.OutboundLegId,
        idInbound: el.InboundLegId,
      };
    });
    const getDetailsOutbound = getPriceAndLink.map(element => {
      const data = travelData.Legs.find(el => el.Id === element.idOutbound);
      return {
        idOutbound: element.idOutbound,
        arrival: data.Arrival,
        departure: data.Departure,
        carriers: data.Carriers,
        destination: data.DestinationStation,
        origin: data.OriginStation,
        duration: data.Duration,
        flightNumbers: data.FlightNumbers,
        segmentIds: data.SegmentIds,
      };
    });
    const getDetailsInbound = getPriceAndLink.map(element => {
      const data = travelData.Legs.find(el => el.Id === element.idInbound);
      return {
        idInbound: element.idInbound,
        arrival: data.Arrival,
        departure: data.Departure,
        carriers: data.Carriers,
        destination: data.DestinationStation,
        origin: data.OriginStation,
        duration: data.Duration,
        flightNumbers: data.FlightNumbers,
        segmentIds: data.SegmentIds,
      };
    });

    return travelData.Itineraries.map(element => {
      return (
        <Itineraries
          key={uuid.v4()}
          linkToPayments={element.PricingOptions}
          arrivalOutbound={
            getDetailsOutbound.find(
              el => el.idOutbound === element.OutboundLegId,
            ).arrival
          }
          departureOutbound={
            getDetailsOutbound.find(
              el => el.idOutbound === element.OutboundLegId,
            ).departure
          }
          durationOutbound={
            getDetailsOutbound.find(
              el => el.idOutbound === element.OutboundLegId,
            ).duration
          }
          destinationOutbound={
            getDetailsOutbound.find(
              el => el.idOutbound === element.OutboundLegId,
            ).destination
          }
          originOutbound={
            getDetailsOutbound.find(
              el => el.idOutbound === element.OutboundLegId,
            ).origin
          }
          arrivalInbound={
            getDetailsInbound.find(el => el.idInbound === element.InboundLegId)
              .arrival
          }
          departureInbound={
            getDetailsInbound.find(el => el.idInbound === element.InboundLegId)
              .departure
          }
          durationInbound={
            getDetailsInbound.find(el => el.idInbound === element.InboundLegId)
              .duration
          }
          destinationInbound={
            getDetailsInbound.find(el => el.idInbound === element.InboundLegId)
              .destination
          }
          originInbound={
            getDetailsInbound.find(el => el.idInbound === element.InboundLegId)
              .origin
          }
          flightNumbersInbound={
            getDetailsInbound.find(el => el.idInbound === element.InboundLegId)
              .flightNumbers
          }
          flightNumbersOutbound={
            getDetailsOutbound.find(
              el => el.idOutbound === element.OutboundLegId,
            ).flightNumbers
          }
          segmentIdsOutbound={
            getDetailsOutbound.find(
              el => el.idOutbound === element.OutboundLegId,
            ).segmentIds
          }
          segmentIdsInbound={
            getDetailsInbound.find(el => el.idInbound === element.InboundLegId)
              .segmentIds
          }
          carriers={travelData.Carriers}
          currencies={travelData.Currencies}
          places={travelData.Places}
          agents={travelData.Agents}
          segments={travelData.Segments}
        />
      );
    });
  };
  paginationHandler = () => {
    console.log("ellkp");
  };

  render() {
    return (
      <div>
        <h1>results: </h1>
        {this.state.loaded ? (
          <>
            {this.renderItineraries()} {this.paginationHandler()}
          </>
        ) : (
          <p>Look for your flights</p>
        )}
      </div>
    );
  }
}
export default SearchResults;
