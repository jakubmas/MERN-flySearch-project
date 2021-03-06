import React from "react";
import axios from "axios";
import {connect} from "react-redux";
//components
import PlaceSearchAutocomplete from "./PlaceSearchAutocomplete";
import CalendarDate from "./CalendarDate";
import SearchResults from "./SearchResults";
import Alert from "../Alert";
//redux
import {
  setSessionKey,
  calendarValidation,
} from "../../redux/actions/searchFlyQuerries";
import {setAlert} from "../../redux/actions/alert";
//loader
import Loader from "../../layout/ajax-loader.gif";

class SearchBox extends React.Component {
  state = {
    travelResults: {travelData: {Itineraries: [], Agents: []}},
    loading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const {
      sessionKey,
      departureDate,
      arrivalDate,
      calendarValidation,
    } = this.props;
    const {travelResults} = this.state;
    if (sessionKey !== prevProps.sessionKey) {
      this.getDataResults(sessionKey);
    }

    if (travelResults !== prevState.travelResults) {
      this.renderResults();
    }

    if (new Date(departureDate) > new Date(arrivalDate)) {
      calendarValidation();
    }
  }

  getDataResults = async sessionKey => {
    try {
      const res = await axios.get(`/api/flight/key/${sessionKey}`);
      this.setState({loading: true});
      if (!res.data.travelData && res.data.msg.ValidationErrors) {
        setTimeout(() => this.getDataResults(sessionKey), 5000);
      }
      if (res.data.travelData.Status === "UpdatesPending" && !res.data.msg) {
        setTimeout(() => this.getDataResults(sessionKey), 1000);
      } else {
        this.setState({loading: false});
        await this.setState({travelResults: res.data});
      }
    } catch (error) {
      console.error(error);
    }
  };

  searchFlightsPostAxiosHandler = async () => {
    const {setSessionKey, setAlert} = this.props;
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
      `/api/flight/postflight/${departure}/${arrival}/${departureDate}/${arrivalDate}`,
      body,
      config,
    );
    if (res.data.msg === "error") {
      console.log("ERRROR", res.data);
      setAlert("Server Error Try Again", "danger", 3000);
    } else {
      const key = res.data.key;
      setSessionKey(key);
    }
  };

  renderResults = () => {
    try {
      const {travelResults} = this.state;
      return <SearchResults results={travelResults} />;
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {travelResults, loading} = this.state;
    const {Itineraries, Agents} = travelResults.travelData;
    return (
      <div className="search-box--container">
        <div className="search-box--form">
          <PlaceSearchAutocomplete
            placeholderName="&#128747; Departure"
            destination="departure"
          />

          <PlaceSearchAutocomplete
            placeholderName="&#128748; Arrival"
            destination="arrival"
          />

          <CalendarDate dateLabel="From" type="from" />

          <CalendarDate dateLabel="To" type="to" />

          <div className="search-box--button-container">
            <button
              onClick={this.searchFlightsPostAxiosHandler}
              className="btn--small"
            >
              SEARCH FLIGHTS
            </button>
          </div>
        </div>
        <div
          className={`search-box--results__${loading ? "loading" : ""}`}
          style={{flexDirection: "row"}}
        >
          <div className="alert--container--flights">
            <Alert />
          </div>

          {Itineraries.length > 0 && this.renderResults()}
          {Agents.length > 0 && Itineraries.length === 0 ? (
            <h1 className="search-box__title">
              Seems that there are no filghts available
            </h1>
          ) : Itineraries.length > 0 ? null : (
            <h1 className="search-box__title">Where're you going?</h1>
          )}
          <img
            src={Loader}
            className={`search-box--loading__${loading ? "show" : "hide"}`}
            alt="loader"
          />
        </div>
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
  calendarValidation,
  setAlert,
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
