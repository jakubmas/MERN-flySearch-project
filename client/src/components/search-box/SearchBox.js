import React from "react";
import axios from "axios";
import {connect} from "react-redux";
//components
import PlaceSearchAutocomplete from "./components/PlaceSearchAutocomplete";
import CalendarDate from "./components/CalendarDate";
//redux
import {setSessionKey} from "../../redux/actions/searchFlyQuerries";

class SearchBox extends React.Component {
  state = {
    travelResults: [],
  };
  componentDidUpdate(prevProps) {
    const {sessionKey} = this.props;

    if (sessionKey !== prevProps.sessionKey) {
      this.getDataResults(sessionKey);
    }
  }

  getDataResults = async sessionKey => {
    const res = await axios.get(`/api/key/${sessionKey}`);
    this.setState({travelResults: res.data});
  };

  searchFlightsPostAxiosHandler = async () => {
    const {setSessionKey} = this.props;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const {departure, arrival, departureDate, arrivalDate} = this.props;
    const body = JSON.stringify({
      departure,
      arrival,
      departureDate,
      arrivalDate,
    });
    const res = await axios.post(
      `/api/${departure}/${arrival}/${departureDate}/${arrivalDate}`,
      body,
      config,
    );
    const key = await res.data.key;
    setSessionKey(key);
  };
  render() {
    return (
      <div>
        <div style={{display: "flex"}}>
          <div>
            <PlaceSearchAutocomplete
              placeholderName="Departure"
              type="departure"
            />
          </div>
          <div>
            <PlaceSearchAutocomplete placeholderName="Arrival" type="arrival" />
          </div>
          <div>
            <CalendarDate dateLabel="From" type="from" />
          </div>
          <div>
            <CalendarDate dateLabel="To" type="to" />
          </div>
        </div>
        <button onClick={this.searchFlightsPostAxiosHandler}>
          SEARCH FLIGHTS
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    departure: state.searchFlyQuerries.departure,
    arrival: state.searchFlyQuerries.arrival,
    departureDate: state.searchFlyQuerries.departureDate,
    arrivalDate: state.searchFlyQuerries.arrivalDate,
    sessionKey: state.searchFlyQuerries.sessionKey,
  };
}
const mapDispatchToProps = {
  setSessionKey,
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
